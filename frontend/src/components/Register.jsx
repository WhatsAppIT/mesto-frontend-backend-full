import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const { onRegister } = props;
  
    const [formRegisterValue, setFormRegisterValue] = React.useState({
      email: "",
      password: "",
    });
  
    function handleChangeRegister(e) {
      const { name, value } = e.target;
  
      setFormRegisterValue({
        ...formRegisterValue,
        [name]: value,
      });
    }
  
    function handleSubmitRegister(e) {
      e.preventDefault();
  
      const { email, password } = formRegisterValue;
  
      onRegister(email, password);
    }

    return (
        <div className="auth">
            <p className="auth__title">Регистрация</p>
            <form
                onSubmit={handleSubmitRegister}
                className="form form_type_auth"
            >
                <input
                    type="email"
                    className="form__input form__input_type_username"
                    placeholder="Email"
                    name="email" 
                    id="LoginEmail"
                    minLength="2"
                    required
                    onChange={handleChangeRegister}
                    value={formRegisterValue.email}
                    autoComplete="new-password"
                />
                <input
                    type="password"
                    className="form__input form__input_type_password"
                    placeholder="Пароль"
                    name="password"
                    id="LoginPassword"
                    minLength="2"
                    required
                    onChange={handleChangeRegister}
                    value={formRegisterValue.password}
                    autoComplete="new-password"
                />
                <button
                    type="submit"
                    className="form__submit form__submit_type_auth"
                >
                    Зарегистрироваться
                </button>
                <div className="">
                    <Link to="/signin" className="form__link">
                        Уже зарегистрированы? Войти
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
