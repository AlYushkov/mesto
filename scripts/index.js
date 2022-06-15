import { FromValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./Mock.js";
import { PopupSwitcher } from "./PopupSwitcher.js";

const popups = Array.from(document.querySelectorAll(".popup"));
const qs = (selector) => document.querySelector(selector);
const elements = qs(".elements");
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
let popupProfile;
let profileNameInput;
let profileTitleInput;
let profileValidator;
let profilePopupSwitcher;
let popupPlace;
let placeNameInput;
let placeImgLinkInput;
let placeValidator;
let placePopupSwitcher;
let popupImage;
const config = {
    form: '.form',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    error: 'fieldset__input_fail'
}
const forms = {};
function getForms() {
    const formsArray = Array.from(document.forms);
    formsArray.forEach((formElement) => {
        const form = {};
        form.saveBtn = formElement.querySelector(config.saveButton);
        form.inputs = Array.from(formElement.querySelectorAll(config.input));
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
                profileValidator = new FromValidator(config, popupProfile);
                profilePopupSwitcher = new PopupSwitcher(popupProfile);
                break;
            case "popupPlace":
                popupPlace = popup;
                forms["place"].inputs.forEach((input) => {
                    if (input.id == "placeInput")
                        placeNameInput = input;
                    else
                        placeImgLinkInput = input;
                })
                placeValidator = new FromValidator(config, popupPlace);
                placePopupSwitcher = new PopupSwitcher(popupPlace);
                break;
            case "popupImage":
                popupImage = popup;
                break;
        }
    });
}
setPopupExpressions(popups);
const createCard = (data) => {
    const card = new Card(data, popupImage);
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
    profileValidator.enableValidation();
    profilePopupSwitcher.switchToDisplay();
});

placeAddBtn.addEventListener("click", function () {
    placeNameInput.value = "";
    placeNameInput.focus();
    placeImgLinkInput.value = "";
    placeValidator.enableValidation();
    placePopupSwitcher.switchToDisplay();
});

const saveProfileEventHandler = (event) => {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileTitle.textContent = profileTitleInput.value;
    profilePopupSwitcher.switchToHide();
}
popupProfile.addEventListener("submit", saveProfileEventHandler);


const savePlaceEventHandler = (event) => {
    event.preventDefault();
    const data = {};
    data.name = placeNameInput.value;
    data.link = placeImgLinkInput.value;
    const element = createCard(data);
    elements.prepend(element);
    placePopupSwitcher.switchToHide();
}

popupPlace.addEventListener("submit", savePlaceEventHandler);




