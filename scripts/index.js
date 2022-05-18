const qs = (selector) => document.querySelector(selector);
const inputFirstPlaceholder = "";
const inputSecondPlaceholder = "";
const popupTitle = "";
const buttonLabel = "";
let popupMode = 0;
let lockedPadding;
let bodyStyle = [false, document.body.style.overflowY, document.body.style.position];

function switchPopupMode(isEditProfile, isAddPlace, isWatchImage) {
    if (isEditProfile) {
        return 1;
    }
    else if (isAddPlace) {
        return 2;
    }
    else if (isWatchImage) {
        return 3;
    }
    return 0;
}
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
};
function addPlace(place, image) {
    const elements = qs(".elements");
    const elementTemplate = qs("#elementTemplate").content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector(".element__image").src = image;
    element.querySelector(".element__image").alt = place;
    element.querySelector(".element__mesto").textContent = place;
    elements.prepend(element);
    element.querySelector(".btn_to_delete").addEventListener("click", function (event) {
        const card = this.closest('.element');
        card.remove();
    });
    element.querySelector(".btn_to_check").addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    });
    qs(".element__image").addEventListener("mousedown", function (event) {
        popupMode = switchPopupMode(false, false, true);
        const image = event.target.src;
        const title = event.target.parentElement.lastElementChild.textContent;
        addPopupImage(image, title)
        qs(".popup").classList.toggle("popup_active");
        lockScroll();
    });
};
function addPopupImage(image, title) {
    const popup = qs(".popup");
    const imageTamplate = qs("#imageTamplate").content;
    const popupImage = imageTamplate.querySelector(".popup-image").cloneNode(true);
    popup.append(popupImage);
    function clearImage() {
        popupImage.remove();
    }
    qs(".popup-image__image").src = image;
    qs(".popup-image__image").alt = title;
    qs(".popup-image__title").textContent = title;
    qs(".popup").addEventListener("click", function (event) {
        if (event.target == event.currentTarget) {
            {
                popupMode = switchPopupMode(false, false, false);
                this.classList.remove("popup_active");
            }
            clearImage();
            lockScroll();
        }
    });
    qs(".btn_to_close").addEventListener("click", function (event) {
        popupMode = switchPopupMode(false, false, false);
        event.target.closest('.popup').classList.toggle("popup_active");
        clearImage();
        lockScroll();
    });

}
function addPopupContent() {
    const popup = qs(".popup");
    const containerTemplate = qs("#containerTemplate").content;
    const popupContainer = containerTemplate.querySelector(".popup-container").cloneNode(true);
    popup.append(popupContainer);
    function clearInput() {
        popupContainer.remove();
    }
    if (popupMode === 1) {
        qs(".popup-container__title").textContent = "Редактировать профиль";
        qs(".btn__label").textContent = "Сохранить";
        qs(".popup-container__input_field_first").value = qs(".profile__name").textContent;
        qs(".popup-container__input_field_second").value = qs(".profile__title").textContent;
    }
    else if (popupMode === 2) {
        qs(".popup-container__input_field_first").setAttribute("placeholder", "Название");
        qs(".popup-container__input_field_second").setAttribute("placeholder", "Ссылка на картинку");
        qs(".popup-container__title").textContent = "Новое место";
        qs(".btn__label").textContent = "Создать";
    }

    qs(".popup-container__input_field_first").addEventListener("input", function () {
        qs(".popup-container__input_field_first").placeholder = "";
    });
    qs(".popup-container__input_field_second").addEventListener("input", function () {
        qs(".popup-container__input_field_second").placeholder = "";
    });
    qs(".popup").addEventListener("click", function (event) {
        if (event.target == event.currentTarget) {
            {
                popupMode = switchPopupMode(false, false, false);
                this.classList.remove("popup_active");
            }
            clearInput();
            lockScroll();
        }
    });
    qs(".btn_to_close").addEventListener("click", function (event) {
        popupMode = switchPopupMode(false, false, false);
        event.target.closest('.popup').classList.toggle("popup_active");
        clearInput();
        lockScroll();
    });
    qs(".btn_to_save").addEventListener("click", function (event) {
        function isNullOrWhiteSpace(str) {
            return (!str || (str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')).length === 0)
        };
        if (popupMode === 1) {
            if (!isNullOrWhiteSpace(qs(".popup-container__input_field_first").value))
                qs(".profile__name").textContent = qs(".popup-container__input_field_first").value;
            else {
                qs(".popup-container__input_field_first").placeholder = "Напишите имя, фамилию";
                return;
            }
            if (!isNullOrWhiteSpace(qs(".popup-container__input_field_second").value))
                qs(".profile__title").textContent = qs(".popup-container__input_field_second").value;
            else {
                qs(".popup-container__input_field_second").placeholder = "Напишите о себе";
                return;
            }
        }
        else if (popupMode === 2) {
            if (isNullOrWhiteSpace(qs(".popup-container__input_field_first").value)) {
                qs(".popup-container__input_field_first").placeholder = "Укажите место";
                return;
            }
            if (isNullOrWhiteSpace(qs(".popup-container__input_field_second").value)) {
                qs(".popup-container__input_field_second").placeholder = "Укажите ссылку на каритнку";
                return;
            }
            addPlace(qs(".popup-container__input_field_first").value, qs(".popup-container__input_field_second").value);
        }
        event.target.closest('.popup').classList.toggle("popup_active");
        clearInput();
        lockScroll();
    });
};
qs(".btn_to_add").addEventListener("click", function () {
    popupMode = switchPopupMode(false, true, false);
    addPopupContent();
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});
qs(".btn_to_edit").addEventListener("click", function () {
    popupMode = switchPopupMode(true, false, false);
    addPopupContent();
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});

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
initialCards.forEach((item) => addPlace(item.name, item.link));



