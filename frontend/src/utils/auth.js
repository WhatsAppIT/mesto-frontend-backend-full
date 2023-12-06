const url = "https://api.krivolapov.nomoredomainsmonster.ru";

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
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            localStorage.setItem('jwt', res.token);
            return res;
          } else {
            return;
          }
        })
        .catch((err) => console.log(err));
    }

    export const registration = (email, password) => {
        return fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((res) => {
            return res.json();
          })
        .catch((err) => console.log(err));
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
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
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
