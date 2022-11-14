import {
  initialCards,
  editButton,
  // nameInput,
  // jobInput,
  // profileTitle,
  // profileSubtitle,
  photosCards,
  addButton,
  popupTypeProfile,
  popupTypeAddPhoto,
  editForm,
  photoForm,
  placeInput,
  photoInput,
  // popups,
  validationObject,
  popupTypePhoto,
  // fullPhoto,
  // fullPhotoContainerCaption,
} from "./constants.js";

import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

// import { openPopup } from "./utils.js";

// import { closePopup } from "./utils.js";
import { Section } from "./Section.js";
import { popupWithForm } from "./PopupWithForm.js";

const profileValidation = new FormValidator(validationObject, editForm);
const newCardValidation = new FormValidator(validationObject, photoForm);

// Обработчик закрытия всех попапов
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("popup_opened") ||
//       evt.target.classList.contains("close-button")
//     ) {
//       closePopup(popup);
//     }
//   });
// });

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  // nameInput.value = profileTitle.textContent;
  // jobInput.value = profileSubtitle.textContent;
}

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  setProfileInputValue();
  profileValidation.resetValidation();
  openPopup(popupTypeProfile);
});

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  // evt.preventDefault();
  // profileTitle.textContent = nameInput.value;
  // profileSubtitle.textContent = jobInput.value;
  // closePopup(popupTypeProfile);
}

// Валидация формы редактирования профиля
profileValidation.enableValidation();

// Слушатель формы редактирования профиля
// editForm.addEventListener("submit", handleProfileFormSubmit);



// Функция открытия полноразмерного фото в отдельном попапе
// function openFullPhoto(link, name) {
//   fullPhoto.src = link;
//   fullPhoto.alt = name;
//   fullPhotoContainerCaption.textContent = name;
//   openPopup(popupTypePhoto);
// }

// Функция создания новой карточки
// function createCard(link, name, cardTemplateSelector) {
//   const card = new Card(link, name, cardTemplateSelector, handleCardClick);
//   return card.createCardElement();
// }

// Функция отрисовки карточек из массива
// function renderCards(array) {
//   array.forEach((el) => {
//     const card = createCard(el.link, el.name, "#card-template");
//     photosCards.append(card);
//   });
// }

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, "#card-template", open());
    card.createCardElement();
    cardList.addItem(card.cardElement);
  },
},
".photos__cards"
);

cardList.renderItems();

console.log(popupTypeAddPhoto);

const popupWithAddPhotoForm = new popupWithForm({
  popupSelector: ".popup_type_add-photo"
},
  handleFormSubmit(evt) {
    evt.preventDefault();
    const card = new Card(item.link, item.name, "#card-template", open());
    card.createCardElement();
    cardList.addItem(card.cardElement);
    closePopup(popupWithAddPhotoForm);
  }
);

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  console.log(popupWithAddPhotoForm.handleFormSubmit);
  photoForm.reset();
  newCardValidation.resetValidation();
  popupWithAddPhotoForm.open();
});

// Отрисовка дефолтных карточек
// renderCards(initialCards);

// Валидация формы добавления карточки
newCardValidation.enableValidation();

// Обработчик формы добавления карточки
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(photoInput.value, placeInput.value, "#card-template");
  photosCards.prepend(card);
  // closePopup(popupTypeAddPhoto);
}

// Слушатель формы добавления карточки
// photoForm.addEventListener("submit", handlePhotoFormSubmit);