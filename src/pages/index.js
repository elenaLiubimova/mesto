import "./index.css";

import {
  editButtonTypeProfile,
  editButtonTypePhoto,
  addButton,
  editForm,
  photoForm,
  avatarForm,
  validationObject,
  avatarInput,
  saveAvatarButton,
  savePhotoButton,
  saveProfileButton,
  nameInput,
  jobInput,
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

const profileValidation = new FormValidator(validationObject, editForm);
const newCardValidation = new FormValidator(validationObject, photoForm);
const avatarValidation = new FormValidator(validationObject, avatarForm);

let userId;

// Функция уведомления пользователя о процессе загрузки
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Создание экземпляра класса для работы с API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "8a554e8c-b62c-42c8-9826-7b4251a96cc4",
    "Content-Type": "application/json",
  },
});

// Создание экземпляра класса с информацией о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__photo",
});

// Установка информации профиля с сервера и отрисовка карточек с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;

    cards.forEach((item) => {
      const card = createCard(item);
      cardList.addDefaultItem(card);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Создание экземпляра класса для попапа редактирования аватара
const popupEditAvatar = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: () => {
    renderLoading(true, saveAvatarButton);
    api
      .changeAvatar(avatarInput.value)
      .then((userData) => {
        userInfo.setAvatar(userData.avatar);
        popupEditAvatar.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, saveAvatarButton);
      });
  },
});

// Установка слушателей валидации полям форм
avatarValidation.enableValidation();

// Слушатель кнопки добавления аватара
editButtonTypePhoto.addEventListener("click", () => {
  popupEditAvatar.open();
  avatarValidation.resetValidation();
});

// Слушатель попапа редактирования аватара
popupEditAvatar.setEventListeners();

// Экземпляр попапа подтверждения удаления фото
const popupWithConfirm = new PopupWithConfirm(".popup_type_confirm");

popupWithConfirm.setEventListeners();

// Создание экзеипляра класса для попапа полноразмерного фото
const fullPhotoContainer = new PopupWithImage(".popup_type_photo");

// Установка слушателей попапу полноразмерного фото
fullPhotoContainer.setEventListeners();

// Функция создания новой карточки
function createCard(item) {
  const card = new Card(
    item.link,
    item.name,
    item.likes,
    item._id,
    userId,
    item.owner._id,
    "#card-template",
    {
      handleCardClick: () => {
        fullPhotoContainer.open(item.link, item.name);
      },

      handleDeleteButtonClick: (id) => {
        popupWithConfirm.open();
        popupWithConfirm.clickEvent(() => {
          api
            .deleteCard(id)
            .then((cardData) => {
              card.deleteCard();
              popupWithConfirm.close();
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
        });
      },

      handleLikeButtonClick: (id) => {
        if (card.isLiked()) {
          api
            .deleteLike(id)
            .then((cardData) => {
              card.countLikes(cardData.likes);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
        } else {
          api
            .addLike(id)
            .then((cardData) => {
              card.countLikes(cardData.likes);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
        }
      },
    }
  );
  return card.createCardElement();
}

// Создание секции для карточек
const cardList = new Section(".photos__cards");

// Создание экземпляра попапа добавления фото
const popupWithPhotoForm = new PopupWithForm(".popup_type_add-photo", {
  handleFormSubmit: (item) => {
    renderLoading(true, savePhotoButton);
    api
      .addNewCard(item.name, item.link, item.likes)
      .then((cardData) => {
        const newCard = createCard(cardData);
        cardList.addItem(newCard);
        popupWithPhotoForm.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, savePhotoButton);
      });
  },
});

// Установка слушателей попапу добавления фото
popupWithPhotoForm.setEventListeners();

// Создание экземпляра попапа редактирования профиля
const popupEditProfile = new PopupWithForm(".popup_type_profile", {
  handleFormSubmit: () => {
    renderLoading(true, saveProfileButton);
    api
      .setProfileInfo(nameInput.value, jobInput.value)
      .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about);
        popupEditProfile.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, saveProfileButton);
      });
  },
});

// Установка слушателей попапу редактирования профиля
popupEditProfile.setEventListeners();

// Установка слушателей валидации полям форм
newCardValidation.enableValidation();

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  popupWithPhotoForm.open();
  newCardValidation.resetValidation();
});

// Установка слушателей валидации полям форм
profileValidation.enableValidation();

// Слушатель кнопки редактирования профиля
editButtonTypeProfile.addEventListener("click", () => {
  profileValidation.resetValidation();
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});