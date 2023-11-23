import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, buttonText } = props;

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="profile"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            placeholder="Ваше имя"
            className="form__input form__input_type_name"
            name="profileName"
            id="profileName"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            value={name}
            onChange={handleChangeName}
          />
          <span id="error-profileName" className="form__error"></span>
          <input
            type="text"
            placeholder="Ваша профессия"
            className="form__input form__input_type_job"
            name="profileJob"
            id="profileJob"
            minLength="2"
            maxLength="200"
            required
            autoComplete="off"
            value={description}
            onChange={handleChangeDescription}
          />
          <span id="error-profileJob" className="form__error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
