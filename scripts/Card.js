export class Card {
    #popup;
    #placeName;
    #imgLink;
    #cardElement;
    #imgElement;
    #likeButton;
    constructor(data, template) {
        this.#placeName = data.name;
        this.#imgLink = data.link;
        this.#cardElement = template;
        this.#likeButton = this.#cardElement.querySelector(".btn_to_check");
    }

    #handleDelete() {
        this.#cardElement.remove();
        this.#cardElement = null;
    }

    #handleLike() {
        this.#likeButton.classList.toggle("btn_to_check-active");
    }

    #setEventListeners() {
        this.#cardElement.querySelector(".btn_to_delete").addEventListener("click", () => {
            this.#handleDelete();
        });
        this.#likeButton.addEventListener("click", () => {
            this.#handleLike();
        });
    }

    generateCard() {
        this.#cardElement.querySelector('.element__title').textContent = this.#placeName;
        this.#imgElement = this.#cardElement.querySelector('.element__image');
        this.#imgElement.src = this.#imgLink;
        this.#imgElement.alt = this.#placeName;
        this.#setEventListeners();
        return this.#cardElement;
    }
    GetImage() {
        return this.#imgElement;
    }
}
