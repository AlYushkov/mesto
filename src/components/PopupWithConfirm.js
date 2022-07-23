import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    #handleDelete;
    #popup;
    #form;
    #cardElement;

    constructor(popupSelector, handleDelete) {
        super(popupSelector);
        this.#handleDelete = handleDelete;
        this.#popup = super.getPopup();
        this.#form = this.#popup.querySelector(".form");
    };

    open(cardElement) {
        this.#cardElement = cardElement;
        super.open();
    };

    setEventListeners() {
        super.setEventListeners();
        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#handleDelete(this.#cardElement);
        });
    };
}  
