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
    #deleteCardBinded;
    #toggleLiikeBinded;

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
        this.#deleteCardBinded = this.#deleteCard.bind(this);
        this.#toggleLiikeBinded = this.#toggleLiike.bind(this);
    };

    #getTemplate(templateSelector) {
        const element = templateSelector
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element
    };

    #hideBtnToDelete() {
        const btnToDelete = this.#cardElement.querySelector(".btn_to_delete")
        btnToDelete.disabled = true;
        btnToDelete.classList.add('btn_hidden');
    };

    #setEventListeners() {
        if (this.#isOwner) {
            this.#cardElement.querySelector(".btn_to_delete").addEventListener("click", () => {
                this.#handleConfirmPopup({ deleteCard: this.#deleteCardBinded, id: this.#cardElement.dataset.id });
            });
        }
        else {
            this.#hideBtnToDelete();
        }
        this.#likeBtn.addEventListener("click", () => {
            this.#handleLikes({
                id: this.#cardElement.dataset.id,
                isMyLike: this.#cardElement.dataset.mylike,
                likeIt: this.#toggleLiikeBinded
            });
        });
        this.#cardElement.querySelector('.element__image').addEventListener('click', () => {
            this.#handleOpenPopup(this.#placeName, this.#imgLink)
        });
    };

    #toggleLiike(likesQty, myLike) {
        const classExists = this.#likeBtn.classList.contains('btn_to_check-active');
        if (myLike) {
            this.#cardElement.dataset.mylike = "1";
            if (!classExists)
                this.#likeBtn.classList.add('btn_to_check-active');
        }
        else {
            this.#cardElement.dataset.mylike = "0";
            if (classExists)
                this.#likeBtn.classList.remove('btn_to_check-active');
        }
        this.#likesTitle.textContent = likesQty;
    };

    #setActive() {
        const myLike = this.#likes.some(like => {
            return like._id === this.#userId;
        })
        return myLike;
    };

    generateCard() {
        this.#cardElement.querySelector('.element__title').textContent = this.#placeName;
        const imgElement = this.#cardElement.querySelector('.element__image');
        imgElement.src = this.#imgLink;
        imgElement.alt = this.#placeName;
        this.#likesTitle.textContent = this.#likes.length;
        const isMyLike = this.#setActive();
        this.#toggleLiike(this.#likes.length, isMyLike);
        this.#setEventListeners();
        return this.#cardElement;
    };

    #deleteCard() {
        this.#cardElement.remove();
        this.#cardElement = null;
    };
}
