export class UserInfo {
    #name;
    #title;
    constructor({ name, title }) {
        this.#name = document.querySelector(name);
        this.#title = document.querySelector(title);
    }

    getUserInfo() {
        return { name: this.#name.textContent, title: this.#title.textContent };
    }

    setUserInfo({ name, title }) {
        this.#name.textContent = name;
        this.#title.textContent = title;
    }
}