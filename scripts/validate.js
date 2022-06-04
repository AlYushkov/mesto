enableValidation({
    form: '.form',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    error: 'fieldset__input_fail'
});

function enableValidation(vs) {
    const formsArray = Array.from(document.querySelectorAll(vs.form));
    formsArray.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, vs.input, vs.error, vs.saveButton,
            vs.disabledSaveButton, vs.disabledSaveButtonLabel);
    });
};

function setEventListeners(formElement, inputSelector, inputErrorClass,
    buttonElement, disabledButtonClass, disabledButtonLabelClass) {
    const inputsArray = Array.from(formElement.querySelectorAll(inputSelector));
    const button = formElement.querySelector(buttonElement);
    inputsArray.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, inputErrorClass);
            toggleButtonState(button, disabledButtonClass, disabledButtonLabelClass,
                inputsArray, inputErrorClass)
        });
    });
}

function toggleButtonState(buttonObj, buttonClass, labelClass, formInputs, errorClass) {
    const inValid = (formInputs.some(inputElement => {
        return inputElement.classList.contains(errorClass) || inputElement.value === "";
    }));
    if (inValid) {
        buttonObj.classList.add(buttonClass);
        buttonObj.children[0].classList.add(labelClass);
    }
    else if (buttonObj.classList.contains(buttonClass)) {
        buttonObj.classList.remove(buttonClass);
        buttonObj.children[0].classList.remove(labelClass);
    }
};

const checkInputValidity = (inputElement, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, errorClass);
    } else {
        hideInputError(inputElement, errorClass);
    }
};

const showInputError = (inputObj, errorMessage, errorClass) => {
    inputObj.classList.add(errorClass);
    inputObj.nextElementSibling.textContent = errorMessage;
};

const hideInputError = (inputObj, errorClass) => {
    if (inputObj.classList.contains(errorClass)) {
        inputObj.classList.remove(errorClass);
        inputObj.nextElementSibling.textContent = "";
    }
};