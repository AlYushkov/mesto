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

function fetchProfile() {
    fetch('https://nomoreparties.co/v1/cohort-45/users/me', {
        headers: {
            authorization: 'NiTfAvDUYMwUtGVEVSGGdEWvdHdNjkR5'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
}
fetchProfile();
function createCard(item) {
    const card = new Card(item, template, handleOpenPopup);
    const element = card.generateCard();
    return element;
}
const elements = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            elements.addItem(createCard(item));
        },
    },
    ".elements"
)
elements.renderItems();

const profileValidator = new FromValidator(config, forms.profile);
profileValidator.enableValidation();

const placeValidator = new FromValidator(config, forms.place);
placeValidator.enableValidation();

const profileData = {};
profileData.name = ".profile__name";
profileData.title = ".profile__title";
const userInfo = new UserInfo(profileData);

const saveProfileEventHandler = (userData) => {
    userInfo.setUserInfo(userData);
    profilePopup.close();
}

const profilePopup = new PopupWithForm("#profilePopup", saveProfileEventHandler);
profilePopup.setEventListeners();

profileEditBtn.addEventListener("click", function () {
    profileValidator.resetErrors();
    const [name, title] = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileTitleInput.value = title;
    profilePopup.open();
});

const savePlaceEventHandler = (elementData) => {
    const [name, link] = elementData;
    const element = createCard({ name, link });
    elements.addItem(element);
    placePopup.close();
}
const placePopup = new PopupWithForm("#placePopup", savePlaceEventHandler);
placePopup.setEventListeners();

placeAddBtn.addEventListener("click", function () {
    placeValidator.resetErrors();
    placePopup.open();
});

const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

function handleOpenPopup(name, link) {
    const data = {};
    data.link = link;
    data.name = name;
    imagePopup.open(data);
}