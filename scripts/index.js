const qs = (selector) => document.querySelector(selector);
let lockedPadding;
let currentPopup;
const bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
const elements = qs(".elements");
const elementTemplate = qs("#elementTemplate").content;
function lockScroll() {
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
const closeButtons = document.querySelectorAll(".btn_to_close");
closeButtons.forEach((button) => button.addEventListener("click", function (event) {
    event.target.closest('.popup').classList.toggle("popup_active");
    lockScroll();
}));
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => popup.addEventListener("click", function (event) {
    if (event.target == event.currentTarget) {
        {
            this.classList.remove("popup_active");
        }
        lockScroll();
    }
}));

function isNullOrWhiteSpace(str) {
    return (!str || (str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')).length === 0)
};
function saveProfile() {
    const name = currentPopup.querySelector(".popup-container__input_field_first");
    const title = currentPopup.querySelector(".popup-container__input_field_second");
    if (!isNullOrWhiteSpace(name.value)) {
        qs(".profile__name").textContent = name.value;
        name.placeholder = "Имя, фамилия";
    }
    else {
        name.value = null;
        name.placeholder = "Укажите имя, фамилию";
        return null;
    }
    if (!isNullOrWhiteSpace(title.value)) {
        qs(".profile__title").textContent = title.value;
        title.placeholder = "О себе";
    }
    else {
        title.value = null;
        title.placeholder = "Напишите о себе";
        return null;
    }
    return name;
}
function addPlace(place, image) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const img = element.querySelector(".element__image");
    img.src = image;
    img.alt = place;
    element.querySelector(".element__mesto").textContent = place;
    return element;
}
function createCard() {
    const placeName = currentPopup.querySelector(".popup-container__input_field_first");
    const imageSrc = currentPopup.querySelector(".popup-container__input_field_second");
    if (isNullOrWhiteSpace(placeName.value)) {
        placeName.value = null;
        placeName.placeholder = "Укажите место";
        return null;
    }
    if (isNullOrWhiteSpace(imageSrc.value)) {
        imageSrc.value = null;
        imageSrc.placeholder = "Укажите ссылку на каритнку";
        return null;
    }
    placeName.placeholder = "Название";
    imageSrc.placeholder = "Ссылка на картинку";
    return addPlace(placeName.value, imageSrc.value);
}
function displayCard(element) {
    elements.prepend(element);
    element.querySelector(".btn_to_delete").addEventListener("click", function (event) {
        const card = this.closest('.element');
        card.remove();
    });
    element.querySelector(".btn_to_check").addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    });
    qs(".element__image").addEventListener("mousedown", function (event) {
        const image = event.target.src;
        const title = event.target.parentElement.lastElementChild.textContent;
        watchImage(image, title);
        qs("#popupImage").classList.toggle("popup_active");
        lockScroll();
    });
    return true;
}
function watchImage(image, title) {
    qs(".popup-image__image").src = image;
    qs(".popup-image__image").alt = title;
    qs(".popup-image__title").textContent = title;
}
function saveData(popupId) {
    if (popupId === "popupProfile") {
        return saveProfile();
    }
    else if (popupId === "popupPlace") {
        return displayCard(createCard());
    }
}

const submitButtons = document.querySelectorAll('button[type="submit"]');

submitButtons.forEach((button) => button.addEventListener("click", function (event) {

    if (saveData(event.currentTarget.parentElement.parentElement.id)) {
        event.target.closest('.popup').classList.toggle("popup_active");
        lockScroll();
    }
}));

qs(".btn_to_edit").addEventListener("click", function () {
    currentPopup = qs("#popupProfile");
    currentPopup.classList.toggle("popup_active");
    currentPopup.querySelector(".popup-container__input_field_first").value = qs(".profile__name").textContent;
    currentPopup.querySelector(".popup-container__input_field_second").value = qs(".profile__title").textContent;
    lockScroll();
});
qs(".btn_to_add").addEventListener("click", function () {
    currentPopup = qs("#popupPlace");
    currentPopup.classList.toggle("popup_active");
    currentPopup.querySelector(".popup-container__input_field_first").value = "";
    currentPopup.querySelector(".popup-container__input_field_second").value = "";
    lockScroll();
});

function initCards() {
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    initialCards.forEach((item) => displayCard(addPlace(item.name, item.link)));
}
initCards();




