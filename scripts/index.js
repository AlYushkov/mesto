
const qs = (selector) => document.querySelector(selector);
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
const popupProfile = qs("#popupProfile");
const nameInput = popupProfile.querySelector(".fieldset__input_field_first");
const titleInput = popupProfile.querySelector(".fieldset__input_field_second");
const popupPlace = qs("#popupPlace");
const placeNameInput = popupPlace.querySelector(".fieldset__input_field_first")
const placeImageInput = popupPlace.querySelector(".fieldset__input_field_second");
const popupImage = qs("#popupImage");
const popupImageImg = popupImage.querySelector(".popup-image__image");
const popupImageTitle = qs(".popup-image__title");
const bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
const elements = qs(".elements");
const elementTemplate = qs("#elementTemplate").content;
const profileForm = document.forms.profile;
const placeForm = document.forms.place;
const popups = document.querySelectorAll(".popup");
let lockedPadding;

const lockScroll = () => {
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
const openPopup = (popupObj) => {
    popupObj.classList.add("popup_active");
    lockScroll();
}

const closePopup = (popupObj) => {
    popupObj.classList.remove("popup_active");
    lockScroll();
}

profileEditBtn.addEventListener("click", function () {
    nameInput.value = profileName.textContent;
    titleInput.value = profileTitle.textContent;
    openPopup(popupProfile);
    nameInput.focus();
});

placeAddBtn.addEventListener("click", function () {
    placeNameInput.value = "";
    placeImageInput.value = "";
    openPopup(popupPlace);
    placeNameInput.focus();
});

const saveProfile = () => {
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
}

const watchImage = (image, title) => {
    popupImageImg.src = image;
    popupImageImg.alt = title;
    popupImageTitle.textContent = title;
}

const createPlace = (name, link) => {
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
    element
    return element;
}




