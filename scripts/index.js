const qs = (selector) => document.querySelector(selector);
const namePlaceholder = qs(".popup-container__input_field_name").placeholder;
const titlePlaceHolder = qs(".popup-container__input_field_title").placeholder;
let lockedPadding;
let bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
function clearInput() {
    qs(".popup-container__input_field_name").value = "";
    qs(".popup-container__input_field_name").setAttribute("placeholder", namePlaceholder);
    qs(".popup-container__input_field_title").value = "";
    qs(".popup-container__input_field_title").setAttribute("placeholder", titlePlaceHolder);
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
}
qs(".popup-container__input_field_name").addEventListener("input", function () {
    qs(".popup-container__input_field_name").placeholder = "";
});
qs(".popup-container__input_field_title").addEventListener("input", function () {
    qs(".popup-container__input_field_title").placeholder = "";
});
qs(".popup").addEventListener("click", function (event) {
    if (event.target == event.currentTarget) {
        {
            event.target.closest('.popup').classList.toggle("popup_active");
        }
        clearInput();
        lockScroll();
    }
});
qs(".btn_to_close").addEventListener("click", function (event) {
    event.target.closest('.popup').classList.toggle("popup_active");
    clearInput();
    lockScroll();
});
qs(".btn_to_save").addEventListener("click", function (event) {
    event.target.closest('.popup').classList.toggle("popup_active");
    if (qs(".popup-container__input_field_name") != "")
        qs(".profile__name").textContent = qs(".popup-container__input_field_name").value;
    if (qs(".popup-container__input_field_title") != "")
        qs(".profile__title").textContent = qs(".popup-container__input_field_title").value
    clearInput();
    lockScroll();
});


qs(".btn_to_add").addEventListener("click", function () {
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});
qs(".btn_to_edit").addEventListener("click", function () {
    qs(".popup-container__input_field_name").value = qs(".profile__name").textContent;
    qs(".popup-container__input_field_title").value = qs(".profile__title").textContent;
    qs(".popup").classList.toggle("popup_active");
    lockScroll();
});


