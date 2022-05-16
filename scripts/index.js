const qs = (selector) => document.querySelector(selector);
const inputFirstPlaceholder = qs(".popup-container__input_field_first").placeholder;
const inputSecondPlaceholder = qs(".popup-container__input_field_second").placeholder;
const popupTitle = qs(".popup-container__title").textContent;
const buttonLabel = qs(".btn__label").textContent;
const userTemplate = document.querySelector('#popupContainer');
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
function clearInput() {
    qs(".popup-container__input_field_first").value = "";
    qs(".popup-container__input_field_first").setAttribute("placeholder", inputFirstPlaceholder);
    qs(".popup-container__input_field_second").value = "";
    qs(".popup-container__input_field_second").setAttribute("placeholder", inputSecondPlaceholder);
    qs(".popup-container__title").textContent = popupTitle;
    qs(".btn__label").textContent = buttonLabel;
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
    element.querySelector(".element__mask-group").src = image;
    element.querySelector(".element__mask-group").alt = place;
    element.querySelector(".element__mesto").textContent = place;
    element.querySelector(".btn_to_delete").addEventListener("click", function (event) {
        const card = this.closest('.element');
        card.remove();
    });
    element.querySelector(".btn_to_check").addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    });
    elements.prepend(element);
    window.addEventListener("load", event => {
        var image = new Image();
        image.src = image;
        image.addEventListener('error', () => {
            element.querySelector(".btn_to_delete").style.background = "black";

        });
    });
    /* let elements = document.querySelectorAll(".element");
     let cards = [];
     cards.push([image, place, false]);
     elements.forEach((item) => {
         cards.push([(item.querySelector(".element__mask-group").src), (item.querySelector(".element__mesto").textContent),
         (item.querySelector(".btn_to_check-active") != null)]);
     });
     */
};
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
            event.target.closest('.popup').classList.toggle("popup_active");
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
        return (!str || str.length === 0 || /^\s*$/.test(str))
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
            qs(".popup-container__input_field_second").placeholder = "Укажите ссылку на картинку";
            return;
        }
        addPlace(qs(".popup-container__input_field_first").value, qs(".popup-container__input_field_second").value);
    }
    event.target.closest('.popup').classList.toggle("popup_active");
    clearInput();
    lockScroll();
});


qs(".btn_to_add").addEventListener("click", function () {
    popupMode = switchPopupMode(false, true, false);
    qs(".popup-container__input_field_first").setAttribute("placeholder", "Название");
    qs(".popup-container__input_field_second").setAttribute("placeholder", "Ссылка на картинку");
    qs(".popup-container__title").textContent = "Новое место";
    qs(".btn__label").textContent = "Создать";
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});
qs(".btn_to_edit").addEventListener("click", function () {
    popupMode = switchPopupMode(true, false, false);
    qs(".popup-container__input_field_first").value = qs(".profile__name").textContent;
    qs(".popup-container__input_field_second").value = qs(".profile__title").textContent;
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});
let likeButtons = document.querySelectorAll(".btn_to_check");
if (likeButtons.length > 0) {
    document.querySelectorAll(".btn_to_check").forEach((item) => item.addEventListener("click", function (event) {
        event.currentTarget.classList.toggle("btn_to_check-active");
    }));
}
let binButtons = document.querySelectorAll(".btn_to_delete");
if (binButtons.length > 0) {
    document.querySelectorAll(".btn_to_delete").forEach((item) => item.addEventListener("click", function (event) {
        const card = this.closest('.element');
        card.remove();
    }));
}
/*
qs(".btn_to_watch-image").addEventListener("click", function () {
    popupMode = switchPopupMode(false, false, true);
});
*/



