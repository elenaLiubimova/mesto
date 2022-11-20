import elbrusImage from "../../images/elbrus.jpg";
import dombaiImage from "../../images/dombai.jpg";
import kaliningradImage from "../../images/kaliningradskaya_obl.jpg";
import krasnayaPolyanaImage from "../../images/krasnaya_polyana.jpg";
import karachaevskImage from "../../images/karachaevsk.jpg";

export const initialCards = [
  {
    name: "Эльбрус",
    link: elbrusImage,
  },
  {
    name: "Домбай",
    link: dombaiImage,
  },
  {
    name: "Калининградская область",
    link: kaliningradImage,
  },
  {
    name: "Красная поляна",
    link: krasnayaPolyanaImage,
  },
  {
    name: "Эльбрус",
    link: elbrusImage,
  },
  {
    name: "Карачаевск",
    link: karachaevskImage,
  },
];
export const editButton = document.querySelector(".edit-button");
export const nameInput = document.forms.profile.elements.name;
export const jobInput = document.forms.profile.elements.job;
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const photosCards = document.querySelector(".photos__cards");
export const addButton = document.querySelector(".add-button");
export const popupTypeProfile = document.querySelector(".popup_type_profile");
export const popupTypeAddPhoto = document.querySelector(
  ".popup_type_add-photo"
);
export const popupTypePhoto = document.querySelector(".popup_type_photo");
export const editForm = document.forms.profile;
export const photoForm = document.forms.photo;
export const fullPhoto = document.querySelector(".full-photo");
export const fullPhotoContainerCaption = document.querySelector(
  ".full-photo-container__caption"
);
export const placeInput = document.forms.photo.elements.place;
export const photoInput = document.forms.photo.elements.photo;
export const popups = document.querySelectorAll(".popup");

export const validationObject = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__item",
  submitButtonSelector: ".save-button",
  inactiveButtonClass: "save-button_disabled",
  inputErrorClass: "edit-form__item_type_error",
  errorClass: "edit-form__item-error_active",
};