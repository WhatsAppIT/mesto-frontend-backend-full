import React from "react";
import { authorization } from "../utils/auth.js";

function Login(props) {
  const { onLogin } = props;

  const [formLoginValue, setFormLoginValue] = React.useState({
    username: "",
    password: "",
  });

  function handleChangeLogin(e) {
    const { name, value } = e.target;
    setFormLoginValue({
      ...formLoginValue,
      [name]: value,
    });
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    const { username, password } = formLoginValue;

    if (!formLoginValue.username || !formLoginValue.password) {
      return;
    }
    authorization(formLoginValue.username, formLoginValue.password)
    onLogin(username, password);
  }

    return (
        <section className="auth">
            <p className="auth__title">Вход</p>
            <form onSubmit={handleSubmitLogin} className="form form_type_auth">
                <input
                    type="email"
                    className="form__input form__input_type_username"
                    placeholder="Email"
                    id="LoginEmail"
                    name="username"
                    minLength="2"
                    required
                    onChange={handleChangeLogin}
                    value={formLoginValue.username}
                    autoComplete="new-password"
                />
                <input
                    type="password"
                    className="form__input form__input_type_password"
                    placeholder="Пароль"
                    id="LoginPassword"
                    name="password"
                    minLength="2"
                    required
                    onChange={handleChangeLogin}
                    value={formLoginValue.password}
                    autoComplete="new-password"
                />
                <button
                    onClick={handleSubmitLogin}
                    type="submit"
                    className="form__submit form__submit_type_auth"
                >
                    Войти
                </button>
            </form>
        </section>
    );
}

export default Login;
