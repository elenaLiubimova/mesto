import "./index.css";

import {
  editButtonTypeProfile,
  editButtonTypePhoto,
  profilePhoto,
  profileTitle,
  profileSubtitle,
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
import { fullPhoto, fullPhotoContainerCaption } from "../utils/constants.js";
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
  nameSelector: "#name-input",
  jobSelector: "#job-input",
});

// Установка информации профиля с сервера
api
  .getProfileInfo()
  .then((res) => {
    userInfo.setUserInfo(profileTitle, profileSubtitle, res.name, res.about);
    userId = res._id;
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Создание экземпляра класса для попапа редактирования аватара
const popupEditAvatar = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: () => {
    renderLoading(true, saveAvatarButton);
    api
      .changeAvatar(avatarInput.value)
      .then((res) => {
        profilePhoto.src = res.avatar;
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, saveAvatarButton);
        popupEditAvatar.close();
      });
  },
});

avatarValidation.enableValidation();

// Слушатель кнопки добавления аватара
editButtonTypePhoto.addEventListener("click", () => {
  // avatarValidation.resetValidation();
  popupEditAvatar.open();
});

// Слушатель попапа редактирования аватара
popupEditAvatar.setEventListeners();

// Установка аватара с сервера
api
  .getProfileInfo()
  .then((res) => {
    profilePhoto.src = res.avatar;
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Экземпляр попапа подтверждения удаления фото
const popupWithConfirm = new PopupWithConfirm(".popup_type_confirm", {
  handleConfirmClick: (id, card) => {
    api
      .deleteCard(id)
      .then((res) => {
        card.deleteCard();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  },
});

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
        const fullPhotoContainer = new PopupWithImage(
          ".popup_type_photo",
          item.link,
          item.name
        );

        fullPhotoContainer.setEventListeners();
        fullPhotoContainer.open(fullPhoto, fullPhotoContainerCaption);
      },

      handleDeleteButtonClick: (id) => {
        popupWithConfirm.open();
        popupWithConfirm.setEventListeners(id, card);
      },

      handleLikeButtonClick: (id) => {
        if (card.isLiked()) {
          api
            .deleteLike(id)
            .then((res) => {
              card.countLikes(res.likes);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
        } else {
          api
            .addLike(id)
            .then((res) => {
              card.countLikes(res.likes);
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

// Отрисовка карточек с сервера
api
  .getInitialCards()
  .then((data) => {
    data.forEach((item) => {
      const card = createCard(item);
      cardList.addDefaultItem(card);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Создание экземпляра попапа добавления фото
const popupWithPhotoForm = new PopupWithForm(".popup_type_add-photo", {
  handleFormSubmit: (item) => {
    renderLoading(true, savePhotoButton);
    api
      .addNewCard(item.name, item.link, item.likes)
      .then((res) => {
        const newCard = createCard(res);
        cardList.addItem(newCard);
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, savePhotoButton);
        popupWithPhotoForm.close();
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
      .then((res) => {
        userInfo.setUserInfo(
          profileTitle,
          profileSubtitle,
          res.name,
          res.about
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        renderLoading(false, saveProfileButton);
        popupEditProfile.close();
      });
  },
});

// Установка слушателей попапу редактирования профиля
popupEditProfile.setEventListeners();

// Установка слушателей валидации полям форм
newCardValidation.enableValidation();

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupWithPhotoForm.open();
});

profileValidation.enableValidation();

// Слушатель кнопки редактирования профиля
editButtonTypeProfile.addEventListener("click", () => {
  profileValidation.resetValidation();
  popupEditProfile.open();
  userInfo.getUserInfo(profileTitle, profileSubtitle);
});