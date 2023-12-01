import React from "react";
import Card from "./Card.jsx";
import Footer from "./Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-info">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="фото"
            />
          </button>
          <div className="profile__table">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Main;
