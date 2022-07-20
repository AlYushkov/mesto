

const template = document.querySelector('#elementTemplate');

const config = {
    form: '.form',
    field: '.fieldset',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    saveButtonLabel: '.btn__label',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    failedInput: 'fieldset__input_fail',
    errorMessage: '.fieldset__input-error'
}

const forms = document.forms;

const profileAvatarBtn = document.querySelector(".btn_to_edit-avatar");
const profileEditBtn = document.querySelector(".btn_to_edit");
const profileNameInput = forms.profile.querySelector("#nameInput");
const profileTitleInput = forms.profile.querySelector("#titleInput");
const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const placeAddBtn = document.querySelector(".btn_to_add");
const placeNameInput = forms.place.querySelector("#placeInput");
const placeImgLinkInput = forms.place.querySelector("#linkInput");
const saveProfileBtnLbl = forms.profile.querySelector(".btn__label");
const savePlaceBtnLbl = forms.place.querySelector(".btn__label");
const saveAvatarBtnLbl = forms.avatar.querySelector(".btn__label");
const confirmDelete = forms.confirm.querySelector(".btn__label");

export {
    template, profileAvatarBtn, profileEditBtn, placeAddBtn, forms, profileNameInput,
    profileTitleInput, profileAvatar, profileName, profileTitle, placeNameInput, placeImgLinkInput,
    config, saveProfileBtnLbl, savePlaceBtnLbl, saveAvatarBtnLbl, confirmDelete
};