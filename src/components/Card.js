export class Card {
    #handleOpenPopup;
    #handleConfirmPopup;
    #handleLikes;
    #placeName;
    #imgLink;
    #cardElement;
    #userId;
    #isOwner;
    #likes;
    #likesTitle
    #likeBtn;
    constructor({ name, link, owner, likes, _id }, userId, template, handleOpenPopup, handleConfirmPopup, handleLikes) {
        this.#placeName = name;
        this.#imgLink = link;
        this.#cardElement = this.#getTemplate(template);
        this.#cardElement.dataset.id = _id;
        this.#handleOpenPopup = handleOpenPopup;
        this.#handleConfirmPopup = handleConfirmPopup;
        this.#handleLikes = handleLikes;
        this.#likesTitle = this.#cardElement.querySelector('.element__likes_text');
        this.#likeBtn = this.#cardElement.querySelector('.btn_to_check');
        this.#userId = userId;
        if (owner) {
            this.#isOwner = (owner._id === userId) ? true : false;
        }
        else {
            this.#isOwner = true;
        };
        if (likes) {
            this.#likes = likes;
        }
        else {
            this.#likes = [];
        };
    }
    #getTemplate(templateSelector) {
        const element = templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element
    }
    #hideBtnToDelete() {
        const btnToDelete = this.#cardElement.querySelector(".btn_to_delete")
        btnToDelete.disabled = true;
        btnToDelete.classList.add('btn_hidden');
    }
    #setEventListeners() {
        if (this.#isOwner) {
            this.#cardElement.querySelector(".btn_to_delete").addEventListener("click", () => {
                this.#handleConfirmPopup(this.#cardElement);
            });
        }
        else {
            this.#hideBtnToDelete();
        }
        this.#likeBtn.addEventListener("click", async () => {
            this.#handleLikes({
                cardElement: this.#cardElement,
                likeButton: this.#likeBtn,
                likesQty: this.#likesTitle
            });
        });
        this.#cardElement.querySelector('.element__image').addEventListener('click', () => {
            this.#handleOpenPopup(this.#placeName, this.#imgLink)
        });
    }

    generateCard() {
        this.#cardElement.querySelector('.element__title').textContent = this.#placeName;
        const imgElement = this.#cardElement.querySelector('.element__image');
        imgElement.src = this.#imgLink;
        imgElement.alt = this.#placeName;
        this.#cardElement.dataset.likes = this.#likes.length;
        this.#likesTitle.textContent = this.#cardElement.dataset.likes;
        const isMyLike = this.#likes.some(like => {
            return like._id === this.#userId;
        })
        if (isMyLike) {
            this.#likeBtn.classList.add('btn_to_check-active');
            this.#cardElement.dataset.mylike = "1";
        }
        else {
            this.#cardElement.dataset.mylike = "0";
        }
        this.#setEventListeners();
        return this.#cardElement;
    }
}
