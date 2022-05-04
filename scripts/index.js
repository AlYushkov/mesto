const qs = (selector) => document.querySelector(selector);
const addBtn = qs(".btn_to_add");
const closeBtn = qs(".btn_to_close");
const editBtn = qs(".btn_to_edit");
const saveBtn = qs(".btn_to_save");
const popup = qs(".popup");
const profileName = qs("#hName");
const profileTitle = qs("#pTitle");
const _Name = qs("#ppName");
const namePlaceholder = _Name.placeholder;
const _Title = qs("#ppTitle");
const titlePlaceHolder = _Title.placeholder
let bodyStyle = [false, document.body.style.overflowY, document.body.style.position];
function resetPopupContent() {
    _Name.value = "";
    _Name.setAttribute("placeholder", namePlaceholder);
    _Title.value = "";
    _Title.setAttribute("placeholder", titlePlaceHolder);
}
function scrollControl() {
    bodyStyle[0] = !bodyStyle[0];
    if (bodyStyle[0]) {
        document.body.style.position = "fixed";
        document.body.style.overflowY = "scroll";
    }
    else {
        document.body.style.overflowY = bodyStyle[1];
        document.body.style.position = bodyStyle[2];
    }
}
_Name.addEventListener("input", function () {
    _Name.placeholder = "";
});
_Title.addEventListener("input", function () {
    _Title.placeholder = "";
});
popup.addEventListener("click", function (event) {
    if (event.target == event.currentTarget) {
        {
            event.target.closest('.popup').classList.toggle("popup_active");
        }
        resetPopupContent();
        scrollControl();
    }
});
closeBtn.addEventListener("click", function (event) {
    event.target.closest('.popup').classList.toggle("popup_active");
    resetPopupContent();
    scrollControl();
});
addBtn.addEventListener("click", function () {
    popup.classList.toggle("popup_active");
    scrollControl();
});

editBtn.addEventListener("click", function () {
    _Name.value = profileName.textContent;
    _Title.value = profileTitle.textContent;
    popup.classList.toggle("popup_active");
    scrollControl();
});

saveBtn.addEventListener("click", function () {
    popup.classList.toggle("popup_active");
    if (_Name != "")
        profileName.textContent = _Name.value;
    if (_Title != "")
        profileTitle.textContent = _Title.value
    resetPopupContent();
    scrollControl();
});
