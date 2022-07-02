import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    #popup;
    #link;
    #title;
    constructor(popupSelector, { link, name }) {
        super(popupSelector);
        this.#link = link;
        this.#title = name;
        this.#popup = super.getPopup();
    }

    open() {
        const popupImage = this.#popup.querySelector(".popup-image__image");
        const imageTitle = this.#popup.querySelector(".popup-image__title");
        popupImage.src = this.#link;
        popupImage.alt = this.#title;
        imageTitle.textContent = this.#title;
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }
};