import "./index.css";

import {
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

export const api = new Api({
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
    api.addNewCard(item.name, item.link, item.likes)
      .then(res => {
        console.log(res);
        const newCard = createCard(res);
        cardList.addItem(newCard);
        popupWithPhotoForm.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
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
    api.setProfileInfo(nameInput.value, jobInput.value);
    return userInfo.setUserInfo(profileTitle, profileSubtitle, nameInput.value, jobInput.value);
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
      cardList.addItem(createCard(item));
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
  userInfo.getUserInfo(profileTitle, profileSubtitle);
});