import React from "react";

function ImagePopup(props) {
  const { isOpen, onClose, card } = props;

  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__close-button popup__close-button_type_image"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image-card" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
