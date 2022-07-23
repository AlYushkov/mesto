import { FromValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import '../pages/index.css';
import {
    template, profileAvatarBtn, profileEditBtn, placeAddBtn, forms, profileNameInput,
    profileTitleInput, profileAvatar, profileName, profileTitle, placeNameInput, placeImgLinkInput,
    config, saveProfileBtnLbl, savePlaceBtnLbl, saveAvatarBtnLbl, confirmDelete
} from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWtithForm.js';
import { Api } from '../components/Api.js';

let userId;
let cardSection;

const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/',
        token: '31fee790-bdad-4f40-8586-446e1dcdd92a'
    }
);

/*************************profile********************************************/

const profileData = {};
profileData.name = ".profile__name";
profileData.about = ".profile__title";
profileData.avatar = ".profile__avatar";
const userInfo = new UserInfo(profileData);

const profilePromise = api.getPromiseAsync('users/me', 'GET', 'application/json');
profilePromise
    .then((data) => {
        if (!data) {
            return Promise.reject('Нет данных профиля');
        }
        userInfo.setUserInfo({ name: data.name, about: data.about })
        userInfo.setAvatar(data.avatar);
        userId = data._id;
    })
    .catch((err) => {
        console.log(`Ошибка. Запрос профиля не выполнен, (${err})`);
    });

const profileValidator = new FromValidator(config, forms.profile);
profileValidator.enableValidation();

const saveProfileEventHandler = (userData) => {
    const labelText = saveProfileBtnLbl.textContent;
    saveProfileBtnLbl.textContent = "Сохранение...";
    const savePromise = api.saveProfileAsync('users/me', 'PATCH', 'application/json', userData);
    savePromise
        .then((data) => {
            profilePopup.close();
            if (!data) {
                return Promise.reject('Данные профиля не сохранены');
            }
            userInfo.setUserInfo({ name: data.name, about: data.about });
        })
        .catch((err) => {
            console.log(`Ошибка. Запрос не выполнен, (${err})`);
        })
        .finally(() => {
            saveProfileBtnLbl.textContent = labelText;
        });
};

const profilePopup = new PopupWithForm("#profilePopup", saveProfileEventHandler);
profilePopup.setEventListeners();

profileEditBtn.addEventListener("click", function () {
    profileValidator.resetErrors();
    const { about, name } = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileTitleInput.value = about;
    profilePopup.open();
});

const saveAvatarEventHandler = (link) => {
    const [avatarLink] = link;
    const labelText = saveAvatarBtnLbl.textContent;
    saveAvatarBtnLbl.textContent = "Сохранение...";
    const avatarPromise = api.saveAvatarAsync('users/me/avatar', 'PATCH', 'application/json', avatarLink);
    avatarPromise
        .then((data) => {
            avatarPopup.close();
            if (!data) {
                return Promise.reject('Аватар не сохранен');
            }
            userInfo.setAvatar(data.avatar);
        })
        .catch((err) => {
            console.log(`Ошибка. Запрос не выполнен, (${err})`);
        })
        .finally(() => {
            saveAvatarBtnLbl.textContent = labelText;
        });
};

const avatarPopup = new PopupWithForm("#avatarPopup", saveAvatarEventHandler);
avatarPopup.setEventListeners();

profileAvatarBtn.addEventListener("click", function () {
    avatarValidator.resetErrors();
    avatarPopup.open();
});

const avatarValidator = new FromValidator(config, forms.avatar);
avatarValidator.enableValidation();

/**************************cards*****************************************/

const cardsPromise = api.getPromiseAsync('cards', 'GET', 'application/json');
cardsPromise
    .then((cardsArray) => {
        if (!cardsArray) {
            return Promise.reject('Нет данных карточки');
        }
        const tempArray = [];
        // for a paging in other life ;)
        const pageSize = 6;
        const startIndex = 0;
        const lastIndex = startIndex + pageSize;
        const range = ((cardsArray.length > lastIndex) ? lastIndex : data.length);
        for (let i = startIndex; i < range; i++) {
            tempArray.push(cardsArray[i]);
        };
        tempArray.reverse();
        cardSection = createSection(tempArray);
        placeEventHandlerSet(cardSection);
    })
    .catch((err) => {
        console.log(`Ошибка. Запрос карточек не выполнен, (${err})`);
    });

function createCard(item, userId, template, handleOpenPopup, handleConfirmPopup, handleLikes) {
    const card = new Card(item, userId, template, handleOpenPopup, handleConfirmPopup, handleLikes);
    const element = card.generateCard();
    return element;
};

const createSection = (cardsArray) => {
    const section = new Section(
        {
            data: cardsArray,
            renderer: (item) => {
                section.addItem(createCard(item, userId, template, handleOpenPopup, handleConfirmPopup, handleLikes));
            },
        },
        ".elements"
    )
    section.renderItems();
    return section;
};

const placeValidator = new FromValidator(config, forms.place);
placeValidator.enableValidation();

const submitPlaceFormEventHandler = (elementData) => {
    const labelText = savePlaceBtnLbl.textContent;
    savePlaceBtnLbl.textContent = "Сохранение...";
    const [name, link] = elementData;
    const savePromise = api.saveCardAsync('cards', 'POST', 'application/json', { _name: name, _link: link });
    savePromise
        .then((data) => {
            placePopup.close();
            if (!data) {
                return Promise.reject('Данные карточки не сохранены');
            }
            const card = createCard({ name: data.name, link: data.link, owner: data.owner, likes: data.likes, _id: data._id },
                userId, template, handleOpenPopup, handleConfirmPopup, handleLikes);
            cardSection.addItem(card);
            cardSection.refreshSection();
        })
        .catch((err) => {
            console.log(`Ошибка при сохранении карточки, (${err})`);
        })
        .finally(() => {
            savePlaceBtnLbl.textContent = labelText;
        });
};

const placePopup = new PopupWithForm("#placePopup", submitPlaceFormEventHandler);

function placeEventHandlerSet() {
    placePopup.setEventListeners();
}

placeAddBtn.addEventListener("click", function () {
    placeValidator.resetErrors();
    placePopup.open();
});

const confirmPopup = new PopupWithConfirm("#confirmPopup", handleDelete);
confirmPopup.setEventListeners();

function handleConfirmPopup(cardElement) {
    confirmPopup.open(cardElement);
};

function handleDelete({ deleteCard, id }) {
    const deletePromise = api.processRequestAsync('cards', 'DELETE', id);
    deletePromise
        .then(() => {
            deleteCard();
            confirmPopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка при удалении карточки, (${err})`);
        });
};

function handleLikes({ id, isMyLike, likeIt }) {
    let method;
    if (isMyLike === "0") {
        method = 'PUT';
    }
    else if (isMyLike === "1") {
        method = "DELETE";
    }
    else return;
    const cardIdLike = `${id}/likes`;
    const likePromise = api.processRequestAsync('cards', method, cardIdLike);
    likePromise
        .then((data) => {
            if (!data) {
                console.log(`Лайки не обновлены`);
                return;
            }
            const likesQty = data.likes.length;
            const myLike = data.likes.some(like => {
                return like._id === userId;
            })
            likeIt(likesQty, myLike);
        })
        .catch((err) => {
            console.log(`Ошибка изменения лайка, (${err})`);
        });
};

/*****************image******************************************/

const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

function handleOpenPopup(name, link) {
    const data = {};
    data.link = link;
    data.name = name;
    imagePopup.open(data);
};