import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatar.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Создать"
      children={
        <>
          <input
            type="URL"
            placeholder="Ссылка на картинку"
            className="form__input form__input_type_update-avatar"
            name="AvatarLink"
            id="AvatarLink"
            minLength="2"
            required
            ref={avatar}
          />
          <span id="error-AvatarLink" className="form__error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
