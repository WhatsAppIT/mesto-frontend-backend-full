import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const { email, handleLogOut } = props;

    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt='логотип' />
            <div className='header__authorization'>
                <Routes>
                    <Route
                        path='/signin'
                        element={
                            <Link
                                to='/signup'
                                className='header__authorization header__authorization_type_signin'
                            >
                                Регистрация
                            </Link>
                        }
                    />
                    <Route
                        path='/signup'
                        element={
                            <Link
                                to='/signin'
                                className='header__authorization header__authorization_type_signup'
                            >
                                Войти
                            </Link>
                        }
                    />
                    <Route
                        path='/'
                        element={
                            <div className='header__userdata'>
                                <p className='header__userdata_email'>
                                    {email}
                                </p>
                                <Link
                                    to='/signin'
                                    className='header__authorization header__authorization_type_main'
                                    onClick={handleLogOut}
                                >
                                    Выйти
                                </Link>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </header>
    );
}

export default Header;
