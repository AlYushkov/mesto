import { FromValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./Mock.js";

const bodyOverFlowY = document.body.style.overflowY;
const lockedPadding = window.innerWidth - document.body.offsetWidth + "px";

const popups = Array.from(document.querySelectorAll(".popup"));
const elements = document.querySelector(".elements");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
let profileEditBtn = document.querySelector(".btn_to_edit");
let placeAddBtn = document.querySelector(".btn_to_add");;
let profilePopup;
let profilePopupCloseBtn;
let placePopup;
let placePopupCloseBtn;
let imagePopup;
let imagePopupCloseBtn;
let isActive;
let currentPopup;
const config = {
    form: '.form',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    error: 'fieldset__input_fail',
    errorSingleString: 'fieldset__input-error_sngle-string'
}
const forms = document.forms;

const profileNameInput = forms.profile.querySelector("#nameInput");
const profileTitleInput = forms.profile.querySelector("#titleInput");
const profileValidator = new FromValidator(config, forms.profile);
profileValidator.enableValidation();

const placeNameInput = forms.place.querySelector("#placeInput");
const placeImgLinkInput = forms.place.querySelector("#linkInput");
const placeValidator = new FromValidator(config, forms.place);
placeValidator.enableValidation();

function lockScroll() {
    isActive = !isActive;
    if (isActive) {
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = lockedPadding;
        document.addEventListener("keydown", handleEscKeyDown);
    }
    else {
        document.body.style.paddingRight = "0px";
        document.body.style.overflowY = bodyOverFlowY;
        document.removeEventListener("keydown", handleEscKeyDown);
    }
}
function handleEscKeyDown(event) {
    if (event.key === "Escape") {
        hidePopup();
    };
}
function displayPopup(popup) {
    currentPopup = popup;
    currentPopup.classList.add("popup_active");
    lockScroll();
}
function hidePopup() {
    currentPopup.classList.remove("popup_active");
    currentPopup = null;
    lockScroll();
}

function handleCloseBtn() {
    hidePopup();
}

function handlePopup(event) {
    if (event.target === event.currentTarget) {
        hidePopup();
    }
}

function setPopupEventListeners(popup, closeButton) {
    closeButton.addEventListener("click", handleCloseBtn);
    popup.addEventListener("click", handlePopup);
}


const setPopupExpressions = (popups) => {
    popups.forEach((popup) => {
        switch (popup.id) {
            case "profilePopup":
                profilePopup = popup;
                profilePopupCloseBtn = popup.querySelector(".btn_to_close");
                setPopupEventListeners(popup, profilePopupCloseBtn);
                break;
            case "placePopup":
                placePopup = popup;
                placePopupCloseBtn = popup.querySelector(".btn_to_close");
                setPopupEventListeners(popup, placePopupCloseBtn);
                break;
            case "imagePopup":
                imagePopup = popup;
                imagePopupCloseBtn = popup.querySelector(".btn_to_close");
                setPopupEventListeners(popup, imagePopupCloseBtn);
                break;
        }
    });
}
setPopupExpressions(popups);



const getTemplate = () => {
    const element = document
        .querySelector('#elementTemplate')
        .content
        .querySelector('.element')
        .cloneNode(true);
    return element;
}

function handleImagePopup() {
    const image = imagePopup.querySelector(".popup-image__image");
    image.src = this.src;
    image.alt = this.alt;
    const title = imagePopup.querySelector(".popup-image__title");
    title.textContent = this.alt;
    displayPopup(imagePopup);
}
const createCard = (data) => {
    const template = getTemplate();
    const card = new Card(data, template);
    const element = card.generateCard();
    const elementImage = card.GetImage();
    elementImage.addEventListener("mousedown", handleImagePopup);
    return element;
}
initialCards.forEach((initialCard) => {
    const element = createCard(initialCard);
    elements.prepend(element);
})

profileEditBtn.addEventListener("click", function () {
    profileNameInput.value = profileName.textContent;
    profileNameInput.focus();
    profileTitleInput.value = profileTitle.textContent;
    profileValidator.resetErrors();
    displayPopup(profilePopup)
});

placeAddBtn.addEventListener("click", function () {
    placeNameInput.value = "";
    placeNameInput.focus();
    placeImgLinkInput.value = "";
    placeValidator.resetErrors();
    displayPopup(placePopup);
});

const saveProfileEventHandler = (event) => {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileTitle.textContent = profileTitleInput.value;
    hidePopup(profilePopup);
}
profilePopup.addEventListener("submit", saveProfileEventHandler);


const savePlaceEventHandler = (event) => {
    event.preventDefault();
    const data = {};
    data.name = placeNameInput.value;
    data.link = placeImgLinkInput.value;
    const element = createCard(data);
    elements.prepend(element);
    hidePopup(placePopup);
}

placePopup.addEventListener("submit", savePlaceEventHandler);




