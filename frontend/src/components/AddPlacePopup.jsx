import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, buttonText } = props;

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeNameAdd(e) {
    setName(e.target.value);
  }

  function handleChangeLinkAdd(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="cards"
      buttonText={buttonText}
      children={
        <>
          <input
            type="text"
            placeholder="Название"
            className="form__input form__input_type_title"
            name="profileTitle"
            id="profileTitle"
            minLength="2"
            maxLength="30"
            required
            autoComplete="off"
            onChange={handleChangeNameAdd}
            value={name}
          />
          <span id="error-profileTitle" className="form__error" />
          <input
            type="URL"
            placeholder="Ссылка на картинку"
            className="form__input form__input_type_link"
            name="profileLink"
            id="profileLink"
            minLength="2"
            required
            onChange={handleChangeLinkAdd}
            value={link}
          />
          <span id="error-profileLink" className="form__error" />
        </>
      }
    />
  );
}

export default AddPlacePopup;
