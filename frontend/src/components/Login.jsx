import React from "react";

function Login(props) {
    const { onLogin } = props;

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmitLogin(e) {
        e.preventDefault();
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
                    minLength="2"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    autoComplete="new-password"
                />
                <input
                    type="password"
                    className="form__input form__input_type_password"
                    placeholder="Пароль"
                    id="LoginPassword"
                    minLength="2"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="new-password"
                />
                <button
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
