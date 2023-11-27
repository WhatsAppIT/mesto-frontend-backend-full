import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const { onRegister } = props;

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmitRegister(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <div className='auth'>
            <p className='auth__title'>Регистрация</p>
            <form
                onSubmit={handleSubmitRegister}
                className='form form_type_auth'
            >
                <input
                    type='email'
                    className='form__input form__input_type_username'
                    placeholder='Email'
                    id='LoginEmail'
                    minLength='2'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete='new-password'
                />
                <input
                    type='password'
                    className='form__input form__input_type_password'
                    placeholder='Пароль'
                    id='LoginPassword'
                    minLength='2'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete='new-password'
                />
                <button
                    type='submit'
                    className='form__submit form__submit_type_auth'
                >
                    Зарегистрироваться
                </button>
                <div className=''>
                    <Link to='/signin' className='form__link'>
                        Уже зарегистрированы? Войти
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
