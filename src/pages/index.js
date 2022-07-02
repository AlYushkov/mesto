import { FromValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/Mock.js';
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import '../pages/index.css';
import {
    template, profileEditBtn, placeAddBtn, forms, profileNameInput,
    profileTitleInput, placeNameInput, placeImgLinkInput, config
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWtithForm.js';

const elements = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            const card = new Card(item, template, handleOpenPopup);
            const element = card.generateCard();
            return element;
        },
    },
    ".elements"
)
elements.renderItems();

let activePopup;

const profileValidator = new FromValidator(config, forms.profile);
profileValidator.enableValidation();

const placeValidator = new FromValidator(config, forms.place);
placeValidator.enableValidation();

const profileData = {};
profileData.name = ".profile__name";
profileData.title = ".profile__title";
const userInfo = new UserInfo(profileData);

const saveProfileEventHandler = (event) => {
    event.preventDefault();
    const data = { name: profileNameInput.value, title: profileTitleInput.value };
    userInfo.setUserInfo(data);
    activePopup.close();
    activePopup = null;
}

profileEditBtn.addEventListener("click", function () {
    profileValidator.resetErrors();
    const { name, title } = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileNameInput.focus();
    profileTitleInput.value = title;
    activePopup = new PopupWithForm("#profilePopup", saveProfileEventHandler);
    activePopup.setEventListeners();
    activePopup.open();
});

const savePlaceEventHandler = (event) => {
    event.preventDefault();
    const element = { name: placeNameInput.value, link: placeImgLinkInput.value };
    elements.addItem(element);
    activePopup.close();
    activePopup = null;
}

placeAddBtn.addEventListener("click", function () {
    placeNameInput.value = "";
    placeNameInput.focus();
    placeImgLinkInput.value = "";
    placeValidator.resetErrors();
    activePopup = new PopupWithForm("#placePopup", savePlaceEventHandler);
    activePopup.setEventListeners();
    activePopup.open();
});

function handleOpenPopup(name, link) {
    const data = {};
    data.link = link;
    data.name = name;
    const popup = new PopupWithImage("#imagePopup", data);
    popup.setEventListeners();
    popup.open();
}




