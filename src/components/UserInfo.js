export class UserInfo {
    #name;
    #about;
    constructor({ name, about }) {
        this.#name = document.querySelector(name);
        this.#about = document.querySelector(about);
    }

    getUserInfo() {
        return [
            this.#about.textContent,
            this.#name.textContent,
        ]
    }

    setUserInfo([name, about]) {
        this.#about.textContent = about;
        this.#name.textContent = name;
    }

    getOwnerData() {
        return {
            name: this.#name.textContent,
            about: this.#about.textContent,
        }
    }
}