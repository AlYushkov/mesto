export class Card {
    #bodyOverFlowY = document.body.style.overflowY;
    #lockedPadding = window.innerWidth - document.body.offsetWidth + "px";
    #popup;
    #placeName;
    #imgLink;
    #cardElement;
    #imgElement;
    #likeButton;
    #popupImage;
    #popupTitle;
    #popupCloseBtn;
    constructor(data, template) {
        this.#placeName = data.name;
        this.#imgLink = data.link;
        this.#cardElement = this.#getTemplate(template);
        this.#likeButton = this.#cardElement.querySelector(".btn_to_check");
        this.#popup = document.querySelector("#imagePopup");
        this.#popupImage = this.#popup.querySelector(".popup-image__image");
        this.#popupTitle = this.#popup.querySelector(".popup-image__title");
        this.#popupCloseBtn = imagePopup.querySelector(".btn_to_close");
    }
    #getTemplate(templateSelector) {
        const element = templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element
    }
    #handleEscKeyDown(event) {
        if (event.key === "Escape") {
            this.#hidePopup();
        };
    }
    #displayPopup() {
        document.addEventListener("keydown", (event) => { this.#handleEscKeyDown(event) }, { once: true });
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = this.#lockedPadding
        this.#popupImage.src = this.#imgLink;
        this.#popupImage.alt = this.#placeName;
        this.#popupTitle.textContent = this.#placeName;
        this.#popup.classList.add("popup_active");
    }
    #hidePopup() {
        this.#popup.classList.remove("popup_active");
        document.body.style.paddingRight = "0px";
        document.body.style.overflowY = this.#bodyOverFlowY;
    }

    #handleDelete() {
        this.#cardElement.remove();
        this.#cardElement = null;
    }

    #handleLike() {
        this.#likeButton.classList.toggle("btn_to_check-active");
    }

    #handlClose() {
        this.#hidePopup();
    }

    #handlePopup(event) {
        if (event.target === event.currentTarget) {
            this.#hidePopup();
        }
    }

    #setEventListeners() {
        this.#cardElement.querySelector(".btn_to_delete").addEventListener("click", () => {
            this.#handleDelete();
        });
        this.#likeButton.addEventListener("click", () => {
            this.#handleLike();
        });
        this.#imgElement.addEventListener("mousedown", () => {
            this.#displayPopup();
        });
        this.#popupCloseBtn.addEventListener("click", () => {
            this.#handlClose();
        });
        this.#popup.addEventListener("click", (event) => {
            this.#handlePopup(event)
        })
    }

    generateCard() {
        this.#cardElement.querySelector('.element__title').textContent = this.#placeName;
        this.#imgElement = this.#cardElement.querySelector('.element__image');
        this.#imgElement.src = this.#imgLink;
        this.#imgElement.alt = this.#placeName;
        this.#setEventListeners();
        return this.#cardElement;
    }
}
