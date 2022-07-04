import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    #popup;
    #popupImage;
    #imageTitle;
    constructor(popupSelector) {
        super(popupSelector);
        this.#popup = super.getPopup();
        this.#popupImage = this.#popup.querySelector(".popup-image__image");
        this.#imageTitle = this.#popup.querySelector(".popup-image__title");
    }

    open({ link, name }) {
        this.#popupImage.src = link;
        this.#popupImage.alt = name;
        this.#imageTitle.textContent = name;
        super.open();
    }
};