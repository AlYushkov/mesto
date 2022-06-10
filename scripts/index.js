
const qs = (selector) => document.querySelector(selector);
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
let popupProfile;
let profileSaveButton;
let profileNameInput;
let profileTitleInput;
let popupPlace;
let placeSaveButton;
let placeNameInput;
let placeImgLinkInput;
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
function getForms() {
    const formsArray = Array.from(document.forms);
    formsArray.forEach((formElement) => {
        const form = {};
        form.saveBtn = formElement.querySelector(cfg.saveButton);
        form.inputs = Array.from(formElement.querySelectorAll(cfg.input));
        forms[`${formElement.name}`] = form;
    });
}
getForms();
const setPopupExpressions = (popups) => {
    popups.forEach((popup) => {
        switch (popup.id) {
            case "popupProfile":
                popupProfile = popup;
                forms["profile"].inputs.forEach((input) => {
                    if (input.id == "nameInput")
                        profileNameInput = input;
                    else
                        profileTitleInput = input;
                })
                profileSaveButton = forms["profile"].saveBtn;
            case "popupPlace":
                popupPlace = popup;
                forms["place"].inputs.forEach((input) => {
                    if (input.id == "placeInput")
                        placeNameInput = input;
                    else
                        placeImgLinkInput = input;
                })
                placeSaveButton = forms["place"].saveBtn;
                break;
            case "popupImage":
                popupImage = popup;
                popupImageImg = popupImage.querySelector(".popup-image__image");
                break;
        }
    });
}
setPopupExpressions(popups);

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

function checkFormElements(popupObj) {
    let button;
    let inputs;
    switch (popupObj.id) {
        case "popupProfile":
            button = forms["profile"].saveBtn;
            inputs = forms["profile"].inputs;
            break;
        case "popupPlace":
            button = forms["place"].saveBtn;
            inputs = forms["place"].inputs;
            break
        default:
            return;
    }
    resetErrors(button, cfg.disabledSaveButton, cfg.disabledSaveButtonLabel, inputs, cfg.error);
}

let activePopup;
function escEventHandler(event) {
    if (event.key === "Escape") {
        closePopup(activePopup);
    };
};

const openPopup = (popupObj) => {
    popupObj.classList.add("popup_active");
    lockScroll();
    activePopup = popupObj;
    document.addEventListener("keydown", escEventHandler);
}

const closePopup = (popupObj) => {
    popupObj.classList.remove("popup_active");
    lockScroll();
    if (activePopup) {
        document.removeEventListener("keydown", escEventHandler);
        activePopup = null;
    }
}

popups.forEach((popupElement) => {
    popupElement.addEventListener("click", function (event) {
        if (event.target == event.currentTarget) {
            {
                closePopup(this);
            }
        }
    });
});

closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
        const popupElement = closeBtn.closest(".popup");
        closePopup(popupElement);
    });
});

profileEditBtn.addEventListener("click", function () {
    profileNameInput.value = profileName.textContent;
    profileNameInput.focus();
    profileTitleInput.value = profileTitle.textContent;
    checkFormElements(popupProfile);
    openPopup(popupProfile);
});

placeAddBtn.addEventListener("click", function () {
    placeNameInput.value = "";
    placeNameInput.focus();
    placeImgLinkInput.value = "";
    checkFormElements(popupPlace);
    openPopup(popupPlace);
});

const saveProfileEventHandler = (event) => {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileTitle.textContent = profileTitleInput.value;
    closePopup(popupProfile);
}
popupProfile.addEventListener("submit", saveProfileEventHandler);

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

const savePlaceEventHandler = (event) => {
    event.preventDefault();
    const element = createPlace(placeNameInput.value, placeImgLinkInput.value);
    elements.prepend(element);
    closePopup(popupPlace);
}

popupPlace.addEventListener("submit", savePlaceEventHandler);




