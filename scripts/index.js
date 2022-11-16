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

const profileValidation = new FormValidator(validationObject, editForm);
const newCardValidation = new FormValidator(validationObject, photoForm);

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  setProfileInputValue();
  profileValidation.resetValidation();
  openPopup(popupTypeProfile);
});

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupTypeProfile);
}

// Валидация формы редактирования профиля
profileValidation.enableValidation();

// Слушатель формы редактирования профиля
editForm.addEventListener("submit", handleProfileFormSubmit);

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  // photoForm.reset();
  newCardValidation.resetValidation();
  // openPopup(popupTypeAddPhoto);
  const popupWithPhotoForm = new PopupWithForm( 
    ".popup_type_add-photo", {
      handleFormSubmit: () => {
        evt.preventDefault();

        // const card = createCard(photoInput.value, placeInput.value, "#card-template");
        // photosCards.prepend(card);
        // closePopup(popupTypeAddPhoto);

        // Создание секции для добавленной карточки
        const addedCard = new Section({
          items: {
            name: nameInput.value,
            link: placeInput.value,
          },
          renderer: (item) => {
            const card = new Card(
              item.link,
              item.name,
              "#card-template",
            { 
              handleCardClick: () => {
                const fullPhotoContainer = new PopupWithImage(".popup_type_photo", item.link, item.name);
                fullPhotoContainer.setEventListeners();
                fullPhotoContainer.open();
              }
            });

            addedCard.addItem(card.createCardElement());
          },
        },
        ".photos__cards"
        );

        // Отрисовка добавленной карточки
        addedCard.renderItems();
        
      }
  });
 
  popupWithPhotoForm.setEventListeners(photoForm);

  popupWithPhotoForm.open();
});

// Создание секции для дефолтных карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item.link,
      item.name,
      "#card-template",
    { 
      handleCardClick: () => {
        const fullPhotoContainer = new PopupWithImage(".popup_type_photo", item.link, item.name);
        fullPhotoContainer.setEventListeners();
        fullPhotoContainer.open();
      }
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

// // Слушатель формы добавления карточки
// photoForm.addEventListener("submit", handlePhotoFormSubmit);