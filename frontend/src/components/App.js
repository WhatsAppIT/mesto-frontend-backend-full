import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { api } from "../utils/api.js";
//import { auth } from "../utils/auth.js";
import AddPlacePopup from "./AddPlacePopup.jsx";
import { authorization, registration, getInformation } from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState();
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isRegistrate, setIsRegistrate] = React.useState(false);

  const buttonSubmitText = isLoading ? "Сохранение..." : "Сохранить";
  const navigate = useNavigate();

  React.useEffect(() => {
     if(loggedIn) {
        api.getUserInfo()
          .then((data) => {
            setCurrentUser(data);
            console.log(data)
          }) 
          .catch(console.error)

          setIsLoading(true)
        api.getInitialCards()
            .then((card) => {
              setCards(card);
              console.log(card)
            }) 
            .catch(console.error)
            .finally(() => {
              setIsLoading(false);
            })
    } 
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleLogin(username, password) {
    authorization(username, password)
      .then((res) => {
        setIsRegistrate(false);
        setUserEmail(res.email);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsRegistrate(false);
        setLoggedIn(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleRegister(email, password) {
    registration(email, password)
      .then(() => {
        setIsRegistrate(true);
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrate(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
        getInformation(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
    }
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.slice().filter((c) => c !== card);
        setCards(updatedCards);
      })
      .catch(console.error);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(url) {
    api
      .changeAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .editCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          handleLogOut={handleLogOut}
          email={userEmail}
        />
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
              ></ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={infoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegistrate={isRegistrate}
          name="infotooltip"
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonSubmitText}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={buttonSubmitText}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          buttonText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;