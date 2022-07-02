import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    #handleSubmit;
    #popup;
    #inputs = {};
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this.#handleSubmit = handleSubmit;
        this.#popup = super.getPopup();
        this.#getInputValues();
    }

    #getInputValues() {
        const inputsArray = Array.from(this.#popup.querySelectorAll('.fieldset__input'));
        inputsArray.forEach((input) => {
            this.#inputs[`${input.id}`] = input.value;
        });

    }

    open() {
        super.open();
    }

    close() {
        super.close();
        const keys = Object.keys(this.#inputs);
        keys.forEach((key) => {
            this.#inputs[key] = "";
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this.#popup.addEventListener("submit", this.#handleSubmit);
    }
}