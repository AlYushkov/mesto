import { PopupSwitcher } from "./PopupSwitcher.js";
export class Card {
    #popup;
    #placeName;
    #imgLink;
    #cardElement;
    #imgElement;
    #PopupSwitcher;
    constructor(data, popup) {
        this.#placeName = data.name;
        this.#imgLink = data.link;
        this.#popup = popup;
        this.#PopupSwitcher = new PopupSwitcher(popup);
    }

    #getTemplate() {
        const element = document
            .querySelector('#elementTemplate')
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element;
    }

    #watchImg() {
        const popupImage = this.#popup.querySelector('.popup-image__image');
        popupImage.src = this.#imgLink;
        popupImage.alt = this.#placeName;
        this.#popup.querySelector('.popup-image__title').textContent = this.#placeName;
    }

    #handleDelete() {
        this.#cardElement.remove();
    }

    #handleLike(event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    }

    #handleMouseDown(event) {
        this.#watchImg();
        this.#PopupSwitcher.switchToDisplay();
    }

    #setEventListeners() {
        this.#cardElement.querySelector(".btn_to_delete").addEventListener("click", () => {
            this.#handleDelete();
        });
        this.#cardElement.querySelector(".btn_to_check").addEventListener("click", (event) => {
            this.#handleLike(event);
        });
        this.#imgElement.addEventListener("mousedown", (event) => {
            this.#imgLink = event.target.src;
            this.#placeName = event.target.alt;
            this.#handleMouseDown(event);
        });
    }

    generateCard() {
        this.#cardElement = this.#getTemplate();
        this.#cardElement.querySelector('.element__title').textContent = this.#placeName;
        this.#imgElement = this.#cardElement.querySelector('.element__image');
        this.#imgElement.src = this.#imgLink;
        this.#imgElement.alt = this.#placeName;
        this.#setEventListeners();
        return this.#cardElement;
    }
}
