import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import AddPlacePopup from './AddPlacePopup.jsx';

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
    const [userEmail, setUserEmail] = React.useState('');
    const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] =
        React.useState(false);
    const [isRegistrate, setIsRegistrate] = React.useState(false);
    const buttonSubmitText = isLoading ? 'Сохранение...' : 'Сохранить';

    const navigate = useNavigate();

    function handleLogin(username, password) {
        auth.authorization(username, password)
            .then((res) => {
                setIsRegistrate(false);
                setUserEmail(username);
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setIsRegistrate(false);
                setLoggedIn(false);
                setInfoTooltipPopupOpen(true);
            });
    }

    function handleRegister(email, password) {
        auth.registration(email, password)
            .then(() => {
                setIsRegistrate(true);
                setInfoTooltipPopupOpen(true);
                navigate('/signin', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setIsRegistrate(false);
                setInfoTooltipPopupOpen(false);
            });
    }

    function checkToken() {
        if (localStorage.getItem('jwt')) {
            const token = localStorage.getItem('jwt');
            auth.getInformation(token)
                .then((res) => {
                    if (res && res.data) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                        navigate('/', { replace: true });
                    }
                })
                .catch(console.error);
        } else {
            setLoggedIn(false);
        }
    }

    React.useEffect(() => {
        checkToken();
    }, []);

    function handleLogOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/signin');
    }

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, card]) => {
                setCurrentUser(user);
                setCards(card);
            })
            .catch(console.error);
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const updatedCards = cards.slice().filter((c) => c !== card);
                setCards(updatedCards);
            })
            .catch(console.error);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.editProfile(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(url) {
        api.changeAvatar(url)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.editCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
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
            <div className='page'>
                <Header
                    loggedIn={loggedIn}
                    handleLogOut={handleLogOut}
                    email={userEmail}
                />
                <Routes>
                    <Route
                        path='/signin'
                        element={<Login onLogin={handleLogin} />}
                    />
                    <Route
                        path='/signup'
                        element={<Register onRegister={handleRegister} />}
                    />
                    <Route
                        path='/'
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
                    <Route
                        path='*'
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
                </Routes>

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
                    title='Вы уверены?'
                    name='delete-card'
                    buttonText='Да'
                    onClose={closeAllPopups}
                />
                <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={infoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isRegistrate={isRegistrate}
                    name='infotooltip'
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
