import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    #handleSubmit;
    #popup;
    #form;
    #inputs = {};
    #inputsArray;
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this.#handleSubmit = handleSubmit;
        this.#popup = super.getPopup();
        this.#form = this.#popup.querySelector(".form");
        this.#inputsArray = Array.from(this.#form.querySelectorAll('.fieldset__input'));
    }

    #getInputValues() {
        this.#inputsArray.forEach((input) => {
            this.#inputs[`${input.id}`] = input.value;
        });
        return this.#inputs;
    }

    close() {
        super.close();
        this.#form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#handleSubmit(this.#getInputValues());
        });
    }
}