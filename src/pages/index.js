import "./index.css";

import {
  initialCards,
  editButtonTypeProfile,
  profileTitle,
  profileSubtitle,
  addButton,
  editForm,
  photoForm,
  validationObject,
  nameInput,
  jobInput
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { createCard } from "../utils/utils.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "8a554e8c-b62c-42c8-9826-7b4251a96cc4",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#name-input",
  jobSelector: "#job-input",
});

api.getProfileInfo()
  .then(res => {
    userInfo.setUserInfo(profileTitle, profileSubtitle, res.name, res.about);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

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

// const userInfo = new UserInfo({
//   nameSelector: "#name-input",
//   jobSelector: "#job-input",
// });

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
    renderer: (item) => {
      cardList.addDefaultItem(createCard(item));
    },
  },

  ".photos__cards"
);

// Отрисовка карточек с сервера
api.getInitialCards()
  .then((data) => {
    data.forEach((item) => {
      const card = createCard(item);
      cardList.addItem(card);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Отрисовка дефолтных карточек
// cardList.renderItems();

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupWithPhotoForm.open();
});

// Слушатель кнопки редактирования профиля
editButtonTypeProfile.addEventListener("click", () => {
  profileValidation.resetValidation();
  popupEditProfile.open();
  api.setProfileInfo('Лена', 'Инженер');
  userInfo.getUserInfo(profileTitle, profileSubtitle);
});
