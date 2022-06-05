
const qs = (selector) => document.querySelector(selector);
const profileName = qs(".profile__name");
const profileTitle = qs(".profile__title");
const profileEditBtn = qs(".btn_to_edit");
const placeAddBtn = qs(".btn_to_add");
let popupProfile;
let saveProfileButton;
let popupPlace;
let savePlaceButton;
let popupImage;
let popupImageImg;
const popupImageTitle = qs(".popup-image__title");
const bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
const elements = qs(".elements");
const elementTemplate = qs("#elementTemplate").content;
const popups = Array.from(document.querySelectorAll(".popup"));
const closeButtons = document.querySelectorAll(".btn_to_close");
let lockedPadding;


const setPopupExpressions = (popups) => {
    popups.forEach((popup) => {
        switch (popup.id) {
            case "popupProfile":
                popupProfile = popup;
                saveProfileButton = forms["profile"].saveBtn;
                break;
            case "popupPlace":
                popupPlace = popup;
                savePlaceButton = forms["place"].saveBtn;
                break;
            case "popupImage":
                popupImage = popup;
                popupImageImg = popupImage.querySelector(".popup-image__image");
                break;
        }
    });
}
setPopupExpressions(popups);

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
let activePopup;
function escEventHandler(event) {
    if (event.key === "Escape") {
        closePopup(activePopup);
    };
};
const openPopup = (popupObj) => {
    popupObj.classList.add("popup_active");
    lockScroll();
    activePopup = popupObj;
    document.addEventListener("keydown", escEventHandler);
}

const closePopup = (popupObj) => {
    popupObj.classList.remove("popup_active");
    lockScroll();
    if (activePopup) {
        document.removeEventListener("keydown", escEventHandler);
        activePopup = null;
    }

}

popups.forEach((popupElement) => {
    popupElement.addEventListener("click", function (event) {
        if (event.target == event.currentTarget) {
            {
                const popupElement = this;
                closePopup(popupElement);
            }
        }
    });
});

closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
        const popupElement = closeBtn.closest(".popup");
        closePopup(popupElement);
    });
});

profileEditBtn.addEventListener("click", function () {
    const form = forms["profile"];
    form.inputs.forEach((input) => {
        hideInputError(input, cfg.error);
        switch (input.id) {
            case "nameInput":
                input.value = profileName.textContent;
                input.focus();
                break;
            case "titleInput":
                input.value = profileTitle.textContent;
                break;
            default:
                break;
        }
    });
    openPopup(popupProfile);
});

placeAddBtn.addEventListener("click", function () {
    const form = forms["place"];
    form.inputs.forEach((input) => {
        hideInputError(input, cfg.error);
        switch (input.id) {
            case "placeInput":
                input.value = "";
                input.focus();
                break;
            case "linkInput":
                input.value = "";
                break;
        }
    });
    openPopup(popupPlace);
});

const saveProfileEventHandler = (event) => {
    event.preventDefault();
    if (saveProfileButton.classList.contains("btn_to_save-disabled"))
        event.stopImmediatePropagation();
    else {
        const inputsArray = forms["profile"].inputs;
        inputsArray.forEach((input) => {
            switch (input.id) {
                case "nameInput":
                    profileName.textContent = input.value;
                    break;
                case "titleInput":
                    profileTitle.textContent = input.value;
                    break;
                default:
                    break;
            }
        });
        closePopup(popupProfile);
    }
}
popupProfile.addEventListener("submit", saveProfileEventHandler);

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
    return element;
}

const savePlaceEventHandler = (event) => {
    event.preventDefault();
    if (savePlaceButton.classList.contains("btn_to_save-disabled"))
        event.stopImmediatePropagation();
    else {
        const inputsArray = forms["place"].inputs;
        let name;
        let link;
        inputsArray.forEach((input) => {
            switch (input.id) {
                case "placeInput":
                    name = input.value;
                    break;
                case "linkInput":
                    link = input.value;
                    break;
                default:
                    break;
            }
        })
        const element = createPlace(name, link);
        elements.prepend(element);
        closePopup(popupPlace);
    }
}

popupPlace.addEventListener("submit", savePlaceEventHandler);




