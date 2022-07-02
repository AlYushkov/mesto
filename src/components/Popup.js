export class Popup {
    #popup;
    #bodyOverFlowY;
    #lockedPadding;
    #bindedHandler;
    constructor(popupSelector) {
        this.#popup = document.querySelector(popupSelector);
        this.#bodyOverFlowY = document.body.style.overflowY;
        this.#lockedPadding = window.innerWidth - document.body.offsetWidth + "px";
    }
    getPopup() {
        return this.#popup;
    }
    #handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        };
    }

    open() {
        this.#popup.classList.add("popup_active");
        this.#bindedHandler = this.#handleEscClose.bind(this);
        document.addEventListener("keydown", this.#bindedHandler);
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = this.#lockedPadding;
    }

    close() {
        document.removeEventListener("keydown", this.#bindedHandler);
        this.#bindedHandler = null;
        this.#popup.classList.remove("popup_active");
        document.body.style.paddingRight = "0px";
        document.body.style.overflowY = this.#bodyOverFlowY;
    }

    setEventListeners() {
        this.#popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget || event.target.classList.contains('btn_to_close')) {
                this.close();
            };
        });
    }
};
