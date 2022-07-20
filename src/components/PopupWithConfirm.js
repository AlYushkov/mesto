import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    #handleSubmit;
    #handleDelete;
    #popup;
    #form;
    #cardElement;
    constructor(popupSelector, handleSubmit, handleDelete) {
        super(popupSelector);
        this.#handleSubmit = handleSubmit;
        this.#handleDelete = handleDelete;
        this.#popup = super.getPopup();
        this.#form = this.#popup.querySelector(".form");
    }
    open(cardElement) {
        this.#cardElement = cardElement;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#handleDelete(this.#cardElement);
        });
    }
}  
