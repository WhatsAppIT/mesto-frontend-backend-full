const url = "https://api.krivolapov.nomoredomainsmonster.ru";

const getRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

    export const authorization = (username, password) => {
        return fetch(`${url}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        })
        .then(getRes)
    }

    export const registration = (email, password) => {
        return fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then(getRes)
    }

    export const getInformation = (token) => {
        return fetch(`${url}/users/me`, {
            metod: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then(getRes)
    }

/*     _handleResponseAuth(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    } */
/* 

const auth = new Auth({
    url: "https://api.krivolapov.nomoredomainsmonster.ru",
});

export { auth }; */
