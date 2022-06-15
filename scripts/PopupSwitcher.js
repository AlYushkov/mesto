let cxtPopupSwitcher;
export class PopupSwitcher {
    #popup;
    #closeBtn;
    #bodyOverFlowY = document.body.style.overflowY;
    #lockedPadding = window.innerWidth - document.body.offsetWidth + "px";
    #isActive = false;
    constructor(popup) {
        this.#popup = popup;
        this.#closeBtn = popup.querySelector(".btn_to_close");
        this.#setEventListeners();
        cxtPopupSwitcher = this;
    }
    #handleClocseBtn() {
        cxtPopupSwitcher.switchToHide();
    }
    #handlePopup(event) {
        if (event.target === event.currentTarget) {
            cxtPopupSwitcher.switchToHide();
        }
    }
    #setEventListeners() {
        this.#closeBtn.addEventListener("click", this.#handleClocseBtn);
        this.#popup.addEventListener("click", this.#handlePopup);
    }

    #hadleEscKeyDown(event) {
        if (event.key === "Escape") {
            cxtPopupSwitcher.switchToHide();
        };
    }

    #lockScroll() {
        this.#isActive = !this.#isActive;
        if (this.#isActive) {
            document.body.style.overflowY = "hidden";
            document.body.style.paddingRight = this.#lockedPadding;
            document.addEventListener("keydown", this.#hadleEscKeyDown);
            this.#closeBtn.addEventListener("click", this.#handleClocseBtn);
            this.#popup.addEventListener("click", this.#handlePopup);
        }
        else {
            document.body.style.paddingRight = "0px";
            document.body.style.overflowY = this.#bodyOverFlowY;
            document.removeEventListener("keydown", this.#hadleEscKeyDown);
        }
    }

    switchToDisplay() {
        cxtPopupSwitcher = this;
        this.#popup.classList.add("popup_active");
        this.#lockScroll();
    }
    switchToHide() {
        this.#popup.classList.remove("popup_active");
        this.#lockScroll();
    }
};
