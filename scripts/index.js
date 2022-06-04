
const qs = (selector) => document.querySelector(selector);
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
let popupProfile;
let saveProfileButton;
let popupPlace;
let savePlaceButton;
let popupImage;
let popupImageImg;
const popupImageTitle = qs(".popup-image__title");
const bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
const elements = qs(".elements");
const elementTemplate = qs("#elementTemplate").content;
const popups = Array.from(document.querySelectorAll(".popup"));
const closeButtons = document.querySelectorAll(".btn_to_close");
let lockedPadding;
const forms = {};
const createFormElement = (popup) => {
    const formElements = {};
    const formObject = popup.querySelector(".form");
    if (formObject) {
        formElements.saveBtn = formObject.querySelector(".btn_to_save");
        formElements.inputs = formObject.querySelectorAll(".fieldset__input");
        forms[`${popup.id}`] = formElements;
    }
    else {
        formElements.saveBtn = null;
        formElements.inputs = null;
        forms[`${popup.id}`] = formElements;
    }
}
const setPopupExpressions = (popup) => {
    switch (popup.id) {
        case "popupProfile":
            popupProfile = popup;
            saveProfileButton = forms[`${popup.id}`].saveBtn;
            break;
        case "popupPlace":
            popupPlace = popup;
            savePlaceButton = forms[`${popup.id}`].saveBtn;
            break;
        case "popupImage":
            popupImage = popup;
            popupImageImg = popupImage.querySelector(".popup-image__image");
            break;
    }
}
function getForms() {
    popups.forEach((popup) => {
        createFormElement(popup);
        setPopupExpressions(popup);
    });
}

getForms();

const lockScroll = () => {
    bodyStyle[0] = !bodyStyle[0];
    if (bodyStyle[0]) {
        lockedPadding = (window.innerWidth - document.body.offsetWidth) + "px";
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = lockedPadding;
    }
    else {
        lockedPadding = "0px";
        document.body.style.paddingRight = lockedPadding;
        document.body.style.overflowY = bodyStyle[1];
        document.body.style.position = bodyStyle[2];
    }
}

const openPopup = (popupObj) => {
    popupObj.classList.add("popup_active");
    lockScroll();
}

const closePopup = (popupObj) => {
    popupObj.classList.remove("popup_active");
    lockScroll();
}

popups.forEach((popupElement) => {
    popupElement.addEventListener("click", function (event) {
        if (event.target == event.currentTarget) {
            {
                const popupElement = this;
                const popupForm = forms[popupElement.id];
                clearInputErrors(popupForm);
                closePopup(popupElement);
            }
        }
    });
});

closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
        const popupElement = closeBtn.closest(".popup");
        const popupForm = forms[popupElement.id];
        clearInputErrors(popupForm);
        closePopup(popupElement);
    });
});

const isPopupActive = (popupElement) => popupElement.classList.contains('popup_active');
document.addEventListener("keydown", function (event) {
    const elementIndex = popups.findIndex(isPopupActive);
    if (elementIndex > -1 && event.key === "Escape") {
        const popupForm = forms[`${popups[elementIndex].id}`];
        clearInputErrors(popupForm);
        closePopup(popups[elementIndex]);
    }
});

const clearInputErrors = (popupObj) => {
    if (!popupObj.inputs) return;
    popupObj.inputs.forEach((inputElement) => {
        if (inputElement.classList.contains("fieldset__input_fail")) {
            inputElement.classList.remove("fieldset__input_fail");
        }
        inputElement.nextElementSibling.textContent = "";
    });
    if (!popupObj.saveBtn.classList.contains("btn_to_save-disabled")) {
        popupObj.saveBtn.classList.add("btn_to_save-disabled")
        popupObj.saveBtn.children[0].classList.add("btn__label_mod_disabled");
    }
};

profileEditBtn.addEventListener("click", function () {
    const form = forms[`${popupProfile.id}`];
    form.inputs[0].value = profileName.textContent;
    form.inputs[1].value = profileTitle.textContent;
    openPopup(popupProfile);
    form.inputs[0].focus();
});

placeAddBtn.addEventListener("click", function () {
    const form = forms[`${popupPlace.id}`];
    form.inputs[0].value = "";
    form.inputs[1].value = "";
    openPopup(popupPlace);
    form.inputs[0].focus();
});

const saveProfile = (name, title) => {
    profileName.textContent = name;
    profileTitle.textContent = title;
}
saveProfileButton.addEventListener("click", function (event) {
    if (saveProfileButton.classList.contains("btn_to_save-disabled"))
        event.stopImmediatePropagation();
    else {
        const popupElement = saveProfileButton.closest(".popup");
        const popupForm = forms[popupElement.id];
        saveProfile(popupForm.inputs[0].value, popupForm.inputs[1].value);
        clearInputErrors(popupForm);
        closePopup(popupElement);
    }
})

const watchImage = (image, title) => {
    popupImageImg.src = image;
    popupImageImg.alt = title;
    popupImageTitle.textContent = title;
}

const createPlace = (name, link) => {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImg = element.querySelector(".element__image");
    const elementMesto = element.querySelector(".element__mesto");
    elementImg.src = link;
    elementImg.alt = name;
    elementMesto.textContent = name;
    element.querySelector(".btn_to_delete").addEventListener("click", function (event) {
        const card = this.closest('.element');
        card.remove();
    });
    elementImg.addEventListener("mousedown", function (event) {
        const imgObj = event.target;
        const image = imgObj.src
        const title = imgObj.alt;
        watchImage(image, title);
        openPopup(popupImage);
    });
    element.querySelector(".btn_to_check").addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    });
    return element;
}

savePlaceButton.addEventListener("click", function (event) {
    if (savePlaceButton.classList.contains("btn_to_save-disabled"))
        event.stopImmediatePropagation();
    else {
        const popupElement = savePlaceButton.closest(".popup");
        const popupForm = forms[popupElement.id];
        const element = createPlace(popupForm.inputs[0].value, popupForm.inputs[1].value);
        elements.prepend(element);
        clearInputErrors(popupForm);
        closePopup(popupElement);
    }
})




