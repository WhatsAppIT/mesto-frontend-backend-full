class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._handleResponse);
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._handleResponse);
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    editCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    like(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._handleResponse);
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.like(cardId);
        } else {
            return this.removeLike(cardId);
        }
    }
}

const api = new Api({
    url: 'http://api.mesto.krivolapov.nomoredomainsmonster.ru',
    headers: {
        //authorization: 'dc5ffe71-d4a2-4ae4-8d8f-113b04708a8c',
        'Content-type': 'application/json',
    },
});

export { api };
