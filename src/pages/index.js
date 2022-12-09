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
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { createCard } from "../utils/utils.js";
import { api } from "../components/Api.js";

const userInfo = new UserInfo({
  nameSelector: "#name-input",
  jobSelector: "#job-input",
});

api.getProfileInfo()
  .then(res => {
    console.log('ответ', res);
    // userInfo.setUserInfo(res.name, res.about);
  })

api.getInitialCards()
  .then(res => {
    res.forEach(data => {
      const card = createCard(item)
    })

    cardList.addItem(card);
  })

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

// Отрисовка дефолтных карточек
cardList.renderItems(initialCards);

// api.getInitialCards()
//   .then(res => {
//     console.log(res);
//     cardList.renderItems(res);
//   })

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