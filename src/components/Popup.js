export class Popup {
    #popup;
    #lockedPadding;
    #bindedHandler;

    constructor(popupSelector) {
        this.#popup = document.querySelector(popupSelector);
        this.#bindedHandler = this.#handleEscClose.bind(this);
        this.#lockedPadding = window.innerWidth - document.body.offsetWidth + "px";
    };

    getPopup() {
        return this.#popup;
    };
    #handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        };
    };

    open() {
        this.#popup.classList.add("popup_active");
        document.addEventListener("keydown", this.#bindedHandler);
        document.body.classList.add("body_locked");
        document.body.style.paddingRight = this.#lockedPadding;
    };

    close() {
        document.removeEventListener("keydown", this.#bindedHandler);
        this.#popup.classList.remove("popup_active");
        document.body.classList.remove("body_locked");
        document.body.style.paddingRight = "0px";
    };

    setEventListeners() {
        this.#popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget || event.target.classList.contains('btn_to_close')) {
                this.close();
            };
        });
    };
};
