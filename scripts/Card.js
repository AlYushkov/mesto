export class Card {
    #handleOpenPopup;
    #placeName;
    #imgLink;
    #cardElement;
    #imgElement;
    #likeButton;

    constructor(data, template, handleOpenPopup) {
        this.#placeName = data.name;
        this.#imgLink = data.link;
        this.#cardElement = this.#getTemplate(template);
        this.#handleOpenPopup = handleOpenPopup;
        this.#likeButton = this.#cardElement.querySelector(".btn_to_check");
    }
    #getTemplate(templateSelector) {
        const element = templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element
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
        this.#cardElement.querySelector('.element__image').addEventListener('click', () => {
            this.#handleOpenPopup(this.#placeName, this.#imgLink)
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
}
