import {
  initialCards,
  editButton,
  profileTitle,
  profileSubtitle,
  addButton,
  editForm,
  photoForm,
  validationObject,
} from "./constants.js";

import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { createCard } from "./utils.js";

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
  popupWithPhotoForm.resetForm();
  newCardValidation.resetValidation();
  popupWithPhotoForm.open();
});

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  popupEditProfile.resetForm();
  profileValidation.resetValidation();
  userInfo.getUserInfo(profileTitle, profileSubtitle);
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});
