export class UserInfo {
    #name;
    #about;
    #avatar;

    constructor({ name, about, avatar }) {
        this.#name = document.querySelector(name);
        this.#about = document.querySelector(about);
        this.#avatar = document.querySelector(avatar);
    };

    getUserInfo() {
        return {
            about: this.#about.textContent,
            name: this.#name.textContent,
        }
    };

    setUserInfo({ name, about }) {
        this.#about.textContent = about;
        this.#name.textContent = name;
    };

    setAvatar(link) {
        this.#avatar.src = link;
        this.#avatar.alt = "Аватар";
    };
}