import React from "react";
import UnionV from "../images/UnionV.svg";
import UnionX from "../images/UnionX.svg";

function InfoTooltip(props) {
  const { name, isOpen, onClose, isRegistrate } = props;
  const popupOpenProps = `popup popup_type_${name} popup_opened`;
  const popupCloseProps = `popup popup_type_${name}`;

  return (
    <section className={isOpen ? popupOpenProps : popupCloseProps}>
      <div className="popup__container">
        <button
          className={`popup__close-button popup__close-button_type_${name}`}
          onClick={onClose}
          type="button"
        />
        <div className={`form__title form__title_type_${name}`}>
          {isRegistrate ? (
            <>
              <img
                className="infotooltip__unionv"
                src={UnionV}
                alt="не успешно"
              />
              <h3 className="infotooltip__title">
                Вы успешно зарегистрировались!
              </h3>
            </>
          ) : (
            <>
              <img className="infotooltip__unionx" src={UnionX} alt="успешно" />
              <h3 className="infotooltip__title">
                Что-то пошло не так! Попробуйте еще раз.
              </h3>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
