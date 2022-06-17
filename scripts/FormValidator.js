let cxtFormValidator;
export class FromValidator {
    #configData;
    #formElement;
    #inputsArray;
    #inputElement;
    #button;
    constructor(configData, formElement) {
        this.#configData = configData;
        this.#formElement = formElement;
    }
    enableValidation() {
        this.#setEventListeners();
    }
    #handleInput() {
        this.#checkInputValidity();
        this.#toggleButtonState();
    }
    #setEventListeners() {
        this.#inputsArray = Array.from(this.#formElement.querySelectorAll(this.#configData.input));
        this.#button = this.#formElement.querySelector(this.#configData.saveButton);
        this.#inputsArray.forEach((input) => {
            input.addEventListener('input', () => {
                this.#inputElement = input;
                this.#handleInput();
            });
        });
    }
    #toggleButtonState() {
        const inValid = (this.#inputsArray.some(input => {
            return input.validity.valid === false;
        }));
        if (inValid) {
            this.#button.classList.add(this.#configData.disabledSaveButton);
            this.#button.children[0].classList.add(this.#configData.disabledSaveButtonLabel);
            this.#button.disabled = true;
        }
        else if (this.#button.classList.contains(this.#configData.disabledSaveButton)) {
            this.#button.classList.remove(this.#configData.disabledSaveButton);
            this.#button.children[0].classList.remove(this.#configData.disabledSaveButtonLabel);
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
        this.#inputElement.classList.add(this.#configData.error);
        const errorString = this.#inputElement.nextElementSibling;
        errorString.textContent = this.#inputElement.validationMessage;
        if (errorString.textContent.length < 58 && !errorString.classList.contains(this.#configData.errorSingleString)) {
            errorString.classList.add(this.#configData.errorSingleString);
        }
        else if (errorString.textContent.length > 57 && errorString.classList.contains(this.#configData.errorSingleString)) {
            errorString.classList.remove(this.#configData.errorSingleString);
        }
    };

    #hideInputError() {
        if (this.#inputElement.classList.contains(this.#configData.error)) {
            this.#inputElement.classList.remove(this.#configData.error);
            this.#inputElement.nextElementSibling.textContent = "";
        }
    };

    resetErrors() {
        this.#inputsArray.forEach((input) => {
            this.#inputElement = input;
            this.#hideInputError();
        });
        this.#toggleButtonState();
    }
}