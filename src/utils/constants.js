

const template = document.querySelector('#elementTemplate');


const profileEditBtn = document.querySelector(".btn_to_edit");

const placeAddBtn = document.querySelector(".btn_to_add");

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

const profileNameInput = forms.profile.querySelector("#nameInput");
const profileTitleInput = forms.profile.querySelector("#titleInput");
const placeNameInput = forms.place.querySelector("#placeInput");
const placeImgLinkInput = forms.place.querySelector("#linkInput");

export {
    template, profileEditBtn, placeAddBtn, forms, profileNameInput,
    profileTitleInput, placeNameInput, placeImgLinkInput, config
};