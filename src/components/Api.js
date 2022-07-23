export class Api {
    #baseUrl;
    #token;
    constructor({ baseUrl, token }) {
        this.#baseUrl = baseUrl;
        this.#token = token;
    };

    #getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    async getPromiseAsync(_endPoint, _method, _contentType) {
        const res = await fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            }
        });
        return this.#getResponseData(res);
    };


    async saveProfileAsync(_endPoint, _method, _contentType, [_name, _about]) {
        const res = await fetch(`${this.#baseUrl}${_endPoint}`, {
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
        return this.#getResponseData(res);
    };

    async saveAvatarAsync(_endPoint, _method, _contentType, _link) {
        const res = await fetch(`${this.#baseUrl}${_endPoint}`, {
            method: _method,
            headers: {
                authorization: this.#token,
                'Content-Type': _contentType
            },
            body: JSON.stringify({
                avatar: _link
            })
        });
        return this.#getResponseData(res);
    };

    async saveCardAsync(_endPoint, _method, _contentType, { _name, _link }) {
        const res = await fetch(`${this.#baseUrl}${_endPoint}`, {
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
        return this.#getResponseData(res);
    };

    async processRequestAsync(_endPoint, _method, _requestData) {
        const res = await fetch(`${this.#baseUrl}${_endPoint}/${_requestData}`, {
            method: _method,
            headers: {
                authorization: this.#token
            }
        });
        return this.#getResponseData(res);
    };
}