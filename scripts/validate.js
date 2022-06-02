enableValidation({
    popup: '.popup',
    form: '.form',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    closeButton: '.btn_to_close',
    popupActive: 'popup_active',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    error: 'fieldset__input_fail'
});

function enableValidation(vs) {
    const popups = Array.from(document.querySelectorAll(vs.popup));
    setPopupEventListeners(popups, vs);
};


const isPopupActive = (popupElement) => popupElement.classList.contains('popup_active');

function setPopupEventListeners(popupList, vs) {
    const allPopups = {};
    popupList.forEach((popupElement) => {
        const formObject = popupElement.querySelector(vs.form);
        const popupForm = {};
        if (formObject) {
            popupForm.saveBtn = formObject.querySelector(vs.saveButton);
            popupForm.inputs = Array.from(formObject.querySelectorAll(vs.input));
            popupForm.errorClass = vs.error;
            popupForm.buttonClass = vs.disabledSaveButton;
            popupForm.labelClass = vs.disabledSaveButtonLabel;
            allPopups[`${popupElement.id}`] = popupForm;
            setFormEventListeners(popupForm);
            formObject.addEventListener('submit', function (event) {
                switch (formObject.name) {
                    case "profile":
                        saveProfile();
                        break;
                    case "place":
                        const element = createPlace(popupForm.inputs[0].value, popupForm.inputs[1].value);
                        elements.prepend(element);
                        break;
                }
                popupForm.saveBtn.classList.add(vs.disabledSaveButton);
                popupForm.saveBtn.children[0].classList.add(vs.disabledSaveButtonLabel);
                closePopup(event.target.closest(vs.popup));
                event.preventDefault();
            });
        }
        else {
            popupForm.saveBtn = null;
            popupForm.inputs = null;
            popupForm.errorClass = null;
            popupForm.buttonClass = null;
            popupForm.labelClass = null;
            allPopups[`${popupElement.id}`] = popupForm;
        }
        popupElement.addEventListener("click", function (event) {
            if (event.target == event.currentTarget) {
                {
                    clearInputErrors(popupForm);
                    closePopup(this);
                }
            }
        });
        const closeBtn = popupElement.querySelector(vs.closeButton);
        closeBtn.addEventListener("click", function () {
            clearInputErrors(popupForm);
            closePopup(popupElement);
        });

    });
    document.addEventListener("keydown", function (event) {
        const elementIndex = popupList.findIndex(isPopupActive);
        if (elementIndex > -1 && event.key === "Escape") {
            const popupForm = allPopups[`${popupList[elementIndex].id}`];
            clearInputErrors(popupForm);
            closePopup(popupList[elementIndex]);
        }
    });
}


function setFormEventListeners(formObj) {
    formObj.inputs.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, formObj.errorClass);
            toggleButtonState(formObj)
        });
    });
};

function checkInputValidity(inputObj, errorClass) {
    const valid = inputObj.validity.valid;
    if (!valid) {
        showInputError(inputObj, inputObj.validationMessage, errorClass);
    }
    else {
        hideInputError(inputObj, errorClass);
    }
};

function toggleButtonState(formObj) {
    const inValid = (formObj.inputs.some(inputElement => {
        return inputElement.classList.contains(formObj.errorClass) || inputElement.value === "";
    }));
    if (inValid) {
        formObj.saveBtn.classList.add(formObj.buttonClass);
        formObj.saveBtn.children[0].classList.add(formObj.labelClass);
        formObj.saveBtn.type = "button";
    }
    else if (formObj.saveBtn.classList.contains(formObj.buttonClass)) {
        formObj.saveBtn.classList.remove(formObj.buttonClass);
        formObj.saveBtn.children[0].classList.remove(formObj.labelClass);
        formObj.saveBtn.type = "submit";
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

const clearInputErrors = (popupObj) => {
    if (!popupObj.inputs) return;
    popupObj.inputs.forEach((inputElement) => {
        if (inputElement.classList.contains(popupObj.errorClass)) {
            inputElement.classList.remove(popupObj.errorClass);
            inputElement.nextElementSibling.textContent = "";
        }
    });
    if (!popupObj.saveBtn.classList.contains(popupObj.buttonClass)) {
        popupObj.saveBtn.classList.add(popupObj.buttonClass)
        popupObj.saveBtn.children[0].classList.add(popupObj.labelClass);
    }
};

