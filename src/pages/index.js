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
let placePopup;
let savePlaceEventHandler;
const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/',
        token: '31fee790-bdad-4f40-8586-446e1dcdd92a'
    }
)
/*************************profile********************************************/
const profilePromise = api.getPromise('users/me', 'GET', 'application/json');
profilePromise
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        if (!data) {
            return Promise.reject('Нет данных профиля');
        }
        profileName.textContent = data.name;
        profileTitle.textContent = data.about;
        profileAvatar.src = data.avatar;
        profileAvatar.alt = data.name;
        userId = data._id;
    })
    .catch((err) => {
        console.log(`Ошибка. Запрос профиля не выполнен, (${err})`);
    });
const profileValidator = new FromValidator(config, forms.profile);
profileValidator.enableValidation();
const profileData = {};
profileData.name = ".profile__name";
profileData.about = ".profile__title";
const userInfo = new UserInfo(profileData);
const saveProfileEventHandler = (userData) => {
    const labelText = saveProfileBtnLbl.textContent;
    saveProfileBtnLbl.textContent = "Сохранение...";
    userInfo.setUserInfo(userData);
    const savePromise = api.saveProfile('users/me', 'PATCH', 'application/json', userData,);
    savePromise
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            saveProfileBtnLbl.textContent = labelText;
            profilePopup.close();
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            debugger;
            saveProfileBtnLbl.textContent = labelText;
            profilePopup.close();
            if (!data) {
                return Promise.reject('Данные профиля не сохранены');
            }
            profileName.textContent = data.name;
            profileTitle.textContent = data.about;
        })
        .catch((err) => {
            saveProfileBtnLbl.textContent = labelText;
            profilePopup.close();
            console.log(`Ошибка. Запрос не выполнен, (${err})`);
        });
}

const profilePopup = new PopupWithForm("#profilePopup", saveProfileEventHandler);
profilePopup.setEventListeners();

profileEditBtn.addEventListener("click", function () {
    profileValidator.resetErrors();
    const [about, name] = userInfo.getUserInfo();
    profileNameInput.value = name;
    profileTitleInput.value = about;
    profilePopup.open();
});

const saveAvatarEventHandler = (link) => {
    const [avatarLink] = link;
    const labelText = saveAvatarBtnLbl.textContent;
    saveAvatarBtnLbl.textContent = "Сохранение...";
    const avatarPromise = api.saveAvatar('users/me/avatar', 'PATCH', 'application/json', avatarLink);
    avatarPromise
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            avatarPopup.close();
            saveAvatarBtnLbl.textContent = labelText;
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            saveAvatarBtnLbl.textContent = labelText;
            avatarPopup.close();
            if (!data) {
                return Promise.reject('Аватар не сохранен');
            }
            profileAvatar.src = data.avatar;
            profileAvatar.alt = "аватар";
        })
        .catch((err) => {
            saveAvatarBtnLbl.textContent = labelText;
            avatarPopup.close();
            console.log(`Ошибка. Запрос не выполнен, (${err})`);
        });
}

const avatarPopup = new PopupWithForm("#avatarPopup", saveAvatarEventHandler);
avatarPopup.setEventListeners();

profileAvatarBtn.addEventListener("click", function () {
    avatarValidator.resetErrors();
    avatarPopup.open();
});

const avatarValidator = new FromValidator(config, forms.avatar);
avatarValidator.enableValidation();


/**************************cards*****************************************/

const cardsPromise = api.getPromise('cards', 'GET', 'application/json');
cardsPromise
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
        const section = createSection(tempArray);
        placeEventHandlerSet(section);
    })
    .catch((err) => {
        console.log(`Ошибка. Запрос карточек не выполнен, (${err})`);
    });

function createCard(item) {
    const card = new Card(item, userId, template, handleOpenPopup, handleConfirmPopup, handleLikes);
    const element = card.generateCard();
    return element;
}

const createSection = (cardsArray) => {
    const section = new Section(
        {
            data: cardsArray,
            renderer: (item) => {
                section.addItem(createCard(item));
            },
        },
        ".elements"
    )
    section.renderItems();
    return section;
}

const placeValidator = new FromValidator(config, forms.place);
placeValidator.enableValidation();

function placeEventHandlerSet(cardSection) {
    savePlaceEventHandler = (elementData) => {
        const labelText = savePlaceBtnLbl.textContent;
        savePlaceBtnLbl.textContent = "Сохранение...";
        const [name, link] = elementData;
        const savePromise = api.saveCard('cards', 'POST', 'application/json', { _name: name, _link: link });
        savePromise
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                savePlaceBtnLbl.textContent = labelText;
                placePopup.close();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
                savePlaceBtnLbl.textContent = labelText;
                placePopup.close();
                if (!data) {
                    return Promise.reject('Данные карточки не сохранены');
                }
                const card = createCard({ name: data.name, link: data.link, owner: data.owner, likes: data.likes, _id: data._id },
                    userId, template, handleOpenPopup, handleConfirmPopup, handleLikes);
                cardSection.addItem(card);
            })
            .catch((err) => {
                savePlaceBtnLbl.textContent = labelText;
                console.log(`Ошибка при сохранении карточки, (${err})`);
                placePopup.close();
            });
    }
    placePopup = new PopupWithForm("#placePopup", savePlaceEventHandler);
    placePopup.setEventListeners();

}

placeAddBtn.addEventListener("click", function () {
    placeValidator.resetErrors();
    placePopup.open();
});

const confirmPopup = new PopupWithConfirm("#confirmPopup", handleConfirmPopup, handleDelete);
confirmPopup.setEventListeners();
function handleConfirmPopup(cardElement) {
    confirmPopup.open(cardElement);
}
function handleDelete(cardElement) {
    const deletePromise = api.ProcessRequest('cards', 'DELETE', cardElement.dataset.id);
    deletePromise
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            cardElement.remove();
            cardElement = null;
        })
        .catch((err) => {
            console.log(`Ошибка при удалении карточки, (${err})`);
        });
    confirmPopup.close();
}
function handleLikes({ cardElement, likeButton, likesQty }) {
    let method;
    if (cardElement.dataset.mylike === "0") {
        method = 'PUT';
    }
    else if (cardElement.dataset.mylike === "1") {
        method = "DELETE";
    }
    const cardIdLike = `${cardElement.dataset.id}/likes`;
    const likePromise = api.ProcessRequest('cards', method, cardIdLike);
    likePromise
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            if (!data) {
                console.log(`Лайки не обновлены`);
                return;
            }
            likeButton.classList.toggle("btn_to_check-active");
            likesQty.textContent = data.likes.length;
            const isMyLike = data.likes.some(like => {
                return like._id === userId;
            })
            cardElement.dataset.mylike = isMyLike ? "1" : "0";
        }
        )
        .catch((err) => {
            console.log(`Ошибка изменения лайка, (${err})`);
        });
}

/*****************image******************************************/

const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

function handleOpenPopup(name, link) {
    const data = {};
    data.link = link;
    data.name = name;
    imagePopup.open(data);
}