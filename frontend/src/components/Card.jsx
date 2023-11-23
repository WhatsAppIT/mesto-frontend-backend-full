import React from "react";
import trash from "../images/trash.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  //const { _id, card, onCardClick, onCardLike, onCardDelete } = props;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like_type_button ${
    isLiked && "place__like_type_active"
  }`;

  return (
    <div className="place">
      <div className="place__images">
        <img
          className="place__img"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        {isOwn && (
          <img
            src={trash}
            onClick={handleDeleteClick}
            className="place__trash"
            alt="удалить"
          />
        )}
      </div>
      <div className="place__content">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="place__like_type_number">
            {props.card.likes.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
