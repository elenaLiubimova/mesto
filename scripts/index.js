import {
  initialCards,
  editButton,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  photosCards,
  addButton,
  popupTypeProfile,
  popupTypeAddPhoto,
  editForm,
  photoForm,
  placeInput,
  photoInput,
  popups,
  validationObject,
  popupTypePhoto,
} from "./constants.js";

import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";

import { PopupWithImage } from "./PopupWithImage.js";

import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const profileValidation = new FormValidator(validationObject, editForm);
const newCardValidation = new FormValidator(validationObject, photoForm);

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  profileValidation.resetValidation();
  const popupEditProfile = new PopupWithForm(".popup_type_profile",
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      const userInfo = new UserInfo({
        nameSelector: "#name-input",
        jobSelector: "#job-input"
      });
      return userInfo.setUserInfo(profileTitle, profileSubtitle);
    }
  });
  console.log(popupEditProfile);
  popupEditProfile.setEventListeners(editForm);
  popupEditProfile.open();
  editForm.addEventListener("submit", popupEditProfile.handleFormSubmit);
});

// Обработчик формы редактирования профиля
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(popupTypeProfile);
// }

// Валидация формы редактирования профиля
profileValidation.enableValidation();

// Слушатель формы редактирования профиля
// editForm.addEventListener("submit", handleProfileFormSubmit);

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  newCardValidation.resetValidation();

  const popupWithPhotoForm = new PopupWithForm(".popup_type_add-photo", {
    handleFormSubmit: (evt) => {
      evt.preventDefault();

      // Создание секции для добавленной карточки
      const addedCard = new Section(
        {
          items: {
            name: placeInput.value,
            link: photoInput.value,
          },

          renderer: (item) => {
            console.log(placeInput);

            const card = new Card(item.link, item.name, "#card-template", {
              handleCardClick: () => {
                const fullPhotoContainer = new PopupWithImage(
                  ".popup_type_photo",
                  item.link,
                  item.name
                );
                fullPhotoContainer.setEventListeners();
                fullPhotoContainer.open();
              },
            });

            console.log(item);

            addedCard.addItem(card.createCardElement());
          },
        },
        ".photos__cards"
      );

      // Отрисовка добавленной карточки
      addedCard.renderItems();
    },
  });

  // Слушатель формы добавления карточки

  popupWithPhotoForm.setEventListeners();

  popupWithPhotoForm.open();


});

// Создание секции для дефолтных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.link, item.name, "#card-template", {
        handleCardClick: () => {
          const fullPhotoContainer = new PopupWithImage(
            ".popup_type_photo",
            item.link,
            item.name
          );
          fullPhotoContainer.setEventListeners();
          fullPhotoContainer.open();
        },
      });

      cardList.addDefaultItem(card.createCardElement());
    },
  },
  ".photos__cards"
);

// Отрисовка дефолтных карточек
cardList.renderItems();

// Валидация формы добавления карточки
newCardValidation.enableValidation();

// Обработчик формы добавления карточки
// function handlePhotoFormSubmit(evt) {
//   evt.preventDefault();
//   const card = createCard(photoInput.value, placeInput.value, "#card-template");
//   photosCards.prepend(card);
//   closePopup(popupTypeAddPhoto);
// }