const qs = (selector) => document.querySelector(selector);
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
const popupProfile = qs("#popupProfile");
const nameInput = popupProfile.querySelector(".fieldset__input_field_first");
const titleInput = popupProfile.querySelector(".fieldset__input_field_second");
const profileSaveBtn = popupProfile.querySelector('button[type="submit"]');
const popupPlace = qs("#popupPlace");
const placeNameInput = popupPlace.querySelector(".fieldset__input_field_first")
const placeImageInput = popupPlace.querySelector(".fieldset__input_field_second");
const placeSaveBtn = popupPlace.querySelector('button[type="submit"]');
const popupImage = qs("#popupImage");
const popupImageImg = popupImage.querySelector(".popup-image__image");
const popupImageTitle = qs(".popup-image__title");
const bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
const elements = qs(".elements");
const elementTemplate = qs("#elementTemplate").content;
let lockedPadding;

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
function openPopup(popupObj) {
    popupObj.classList.add("popup_active");
    lockScroll();
}
function closePopup(popupObj) {
    popupObj.classList.remove("popup_active");
    lockScroll();
}
profileEditBtn.addEventListener("click", function () {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    titleInput.value = profileTitle.textContent;
});

placeAddBtn.addEventListener("click", function () {
    openPopup(popupPlace);
    placeNameInput.value = "";
    placeImageInput.value = "";
});

const closeButtons = document.querySelectorAll(".btn_to_close");
closeButtons.forEach((button) => button.addEventListener("click", function (event) {
    closePopup(event.target.closest('.popup'));
}));

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => popup.addEventListener("click", function (event) {
    if (event.target == event.currentTarget) {
        {
            closePopup(this);
        }
    }
}));
function saveProfile() {
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
}

profileSaveBtn.addEventListener("submit", function (event) {
    const profileIsValid = saveProfile();
    if (profileIsValid) {
        closePopup(event.target.closest('.popup'));
    }
})

function createPlace(name, link) {
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

placeSaveBtn.addEventListener("submit", function (event) {
    const element = createPlace(placeNameInput.value, placeImageInput.value);
    elements.prepend(element);
    closePopup(event.target.closest('.popup'));
})

function watchImage(image, title) {
    popupImageImg.src = image;
    popupImageImg.alt = title;
    popupImageTitle.textContent = title;
}

function displayCard(name, link) {
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
        openPopup(popupImage)
    });
    element.querySelector(".btn_to_check").addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    });
    elements.prepend(element);
}

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
    initialCards.forEach((item) => {
        const element = createPlace(item.name, item.link)
        elements.prepend(element);
    });
}
initCards();




