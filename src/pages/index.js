import "./index.css";

import {
  initialCards,
  editButton,
  profileTitle,
  profileSubtitle,
  addButton,
  editForm,
  photoForm,
  validationObject,
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { createCard } from "../utils/utils.js";

const profileValidation = new FormValidator(validationObject, editForm);
const newCardValidation = new FormValidator(validationObject, photoForm);

const popupWithPhotoForm = new PopupWithForm(".popup_type_add-photo", {
  handleFormSubmit: (item) => {
    const newCard = createCard(item);
    cardList.addItem(newCard);
    popupWithPhotoForm.close();
  },
});

popupWithPhotoForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#name-input",
  jobSelector: "#job-input",
});

const popupEditProfile = new PopupWithForm(".popup_type_profile", {
  handleFormSubmit: () => {
    popupEditProfile.close();
    return userInfo.setUserInfo(profileTitle, profileSubtitle);
  },
});

popupEditProfile.setEventListeners();

// Установка слушателей валидации полям форм
newCardValidation.enableValidation();
profileValidation.enableValidation();

// Создание секции для карточек
const cardList = new Section(
  {
    items: initialCards,

    renderer: (item) => {
      cardList.addDefaultItem(createCard(item));
    },
  },
  ".photos__cards"
);

// Отрисовка дефолтных карточек
cardList.renderItems();

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupWithPhotoForm.open();
});

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  profileValidation.resetValidation();
  userInfo.getUserInfo(profileTitle, profileSubtitle);
  popupEditProfile.open();
});