export class Api {
    #baseUrl;
    #token;
    constructor({ baseUrl, token }) {
        this.#baseUrl = baseUrl;
        this.#token = token;
    };

    getPromise(_endPoint, _method, _contentType) {
        return fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            }
        })
    }

    saveProfile(_endPoint, _method, _contentType, [_name, _about],) {
        return fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            },
            body: JSON.stringify({
                name: _name,
                about: _about
            })
        });
    };

    saveAvatar(_endPoint, _method, _contentType, _link) {
        return fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            },
            body: JSON.stringify({
                avatar: _link
            })
        });
    }
    saveCard(_endPoint, _method, _contentType, { _name, _link }) {
        return fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            },
            body: JSON.stringify({
                name: _name,
                link: _link
            })
        });
    }

    ProcessRequest(_endPoint, _method, _requestData) {
        return fetch(`${this.#baseUrl}${_endPoint}/${_requestData}`, {
            method: _method,
            headers: {
                authorization: this.#token
            }
        })
    }
}