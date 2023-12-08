class Auth {
    constructor(options) {
        this._url = options.url;
    }

    authorization(username, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        }).then(this._handleResponseAuth);
    }

    registration(email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._handleResponseAuth);
    }

    getInformation(token) {
        return fetch(`${this._url}/users/me`, {
            metod: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(this._handleResponseAuth);
    }

    _handleResponseAuth(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

const auth = new Auth({
    url: "https://api.krivolapov.nomoredomainsmonster.ru",
});

export { auth };
