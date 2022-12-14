export const editButtonTypeProfile = document.querySelector(
  ".edit-button_type_profile"
);
export const editButtonTypePhoto = document.querySelector(
  ".edit-button_type_photo"
);
export const nameInput = document.forms.profile.elements.name;
export const jobInput = document.forms.profile.elements.job;
export const photosCards = document.querySelector(".photos__cards");
export const addButton = document.querySelector(".add-button");
export const popupTypeProfile = document.querySelector(".popup_type_profile");
export const popupTypeAddPhoto = document.querySelector(
  ".popup_type_add-photo"
);
export const popupTypePhoto = document.querySelector(".popup_type_photo");
export const editForm = document.forms.profile;
export const saveProfileButton =
  document.forms.profile.querySelector(".save-button");
export const photoForm = document.forms.photo;
export const avatarForm = document.forms.avatar;
export const avatarInput = document.forms.avatar.elements.avatar;
export const saveAvatarButton =
  document.forms.avatar.querySelector(".save-button");
export const placeInput = document.forms.photo.elements.place;
export const photoInput = document.forms.photo.elements.photo;
export const savePhotoButton =
  document.forms.photo.querySelector(".save-button");
export const popups = document.querySelectorAll(".popup");

export const validationObject = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__item",
  submitButtonSelector: ".save-button",
  inactiveButtonClass: "save-button_disabled",
  inputErrorClass: "edit-form__item_type_error",
  errorClass: "edit-form__item-error_active",
};