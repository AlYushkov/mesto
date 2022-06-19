import { FromValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./Mock.js";

const bodyOverFlowY = document.body.style.overflowY;
const lockedPadding = window.innerWidth - document.body.offsetWidth + "px";

const elements = document.querySelector(".elements");
const template = document.querySelector('#elementTemplate');

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileEditBtn = document.querySelector(".btn_to_edit");
const profilePopup = document.querySelector("#profilePopup");
const profilePopupCloseBtn = profilePopup.querySelector(".btn_to_close");

const placeAddBtn = document.querySelector(".btn_to_add");
const placePopup = document.querySelector("#placePopup");
const placePopupCloseBtn = placePopup.querySelector(".btn_to_close");

const config = {
    form: '.form',
    field: '.fieldset',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    saveButtonLabel: '.btn__label',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    failedInput: 'fieldset__input_fail',
    errorMessage: '.fieldset__input-error'
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

function handleEscKeyDown(event) {
    if (event.key === "Escape") {
        const popup = document.querySelector(".popup_active");
        hidePopup(popup);
    };
}

function displayPopup(popup) {
    popup.classList.add("popup_active");
    document.addEventListener("keydown", handleEscKeyDown);
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = lockedPadding
}
function hidePopup(popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener("keydown", handleEscKeyDown);
    document.body.style.paddingRight = "0px";
    document.body.style.overflowY = bodyOverFlowY;
}

function handleCloseBtn(popup) {
    hidePopup(popup);
}

function handlePopup(popup) {
    hidePopup(popup);
}

function setPopupEventListeners(popupElement, closeButton) {
    closeButton.addEventListener("click", () => {
        handleCloseBtn(popupElement);
    });
    popupElement.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
            handlePopup(popupElement);
        }
    })
}

setPopupEventListeners(profilePopup, profilePopupCloseBtn);
setPopupEventListeners(placePopup, placePopupCloseBtn);

const createCard = (data) => {
    const card = new Card(data, template);
    const element = card.generateCard();
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




