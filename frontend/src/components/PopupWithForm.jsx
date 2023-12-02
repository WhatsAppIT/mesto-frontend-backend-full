import React from "react";

function PopupWithForm(props) {
  const { name, title, isOpen, onClose, buttonText, children, onSubmit } =
    props;
  const popupOpenProps = `popup popup_type_${name} popup_opened`;
  const popupCloseProps = `popup popup_type_${name}`;

  return (
    <div className={isOpen ? popupOpenProps : popupCloseProps}>
      <div className="popup__container">
        <button
          className={`popup__close-button popup__close-button_type_${name}`}
          onClick={onClose}
          type="button"
        />
        <form
          onSubmit={onSubmit}
          className={`form form_type_${name}`}
          name={name}
        >
          <h2 className={`form__title form__title_type_${name}`}>{title}</h2>
          {children}
          <button
            type="submit"
            className={`form__submit form__submit_type_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
