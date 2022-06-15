import { PopupSwitcher } from "./PopupSwitcher.js";
export class FromValidator {
    #popup;
    #vs;
    #formElement;
    #inputsArray;
    #inputElement;
    #button;
    constructor(cfg, popup) {
        this.#popup = popup;
        this.#vs = cfg;
    }
    enableValidation() {
        this.#formElement = this.#popup.querySelector(this.#vs.form);
        this.#setEventListeners();
        this.#resetErrors();
    }
    #handleInput(event) {
        this.#inputElement = event.target;
        this.#checkInputValidity();
        this.#toggleButtonState();
    }
    #setEventListeners() {
        this.#inputsArray = Array.from(this.#formElement.querySelectorAll(this.#vs.input));
        this.#button = this.#formElement.querySelector(this.#vs.saveButton);
        this.#inputsArray.forEach((input) => {
            input.addEventListener('input', (event) => {
                this.#handleInput(event);
            });
        });
    }
    #toggleButtonState() {
        const inValid = (this.#inputsArray.some(input => {
            return input.classList.contains(this.#vs.error) || input.value === "";
        }));
        if (inValid) {
            this.#button.classList.add(this.#vs.disabledSaveButton);
            this.#button.children[0].classList.add(this.#vs.disabledSaveButtonLabel);
            this.#button.disabled = true;
        }
        else if (this.#button.classList.contains(this.#vs.disabledSaveButton)) {
            this.#button.classList.remove(this.#vs.disabledSaveButton);
            this.#button.children[0].classList.remove(this.#vs.disabledSaveButtonLabel);
            this.#button.disabled = false;
        }
    }

    #checkInputValidity() {
        if (!this.#inputElement.validity.valid) {
            this.#showInputError();
        } else {
            this.#hideInputError();
        }
    }

    #showInputError() {
        this.#inputElement.classList.add(this.#vs.error);
        this.#inputElement.nextElementSibling.textContent = this.#inputElement.validationMessage;
    };

    #hideInputError() {
        if (this.#inputElement.classList.contains(this.#vs.error)) {
            this.#inputElement.classList.remove(this.#vs.error);
            this.#inputElement.nextElementSibling.textContent = "";
        }
    };

    #resetErrors() {
        this.#inputsArray.forEach((input) => {
            this.#inputElement = input;
            this.#hideInputError();
        });
        this.#toggleButtonState();
    }
}