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
} from "./constants.js";

import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

import { openPopup } from "./utils.js";

import { closePopup } from "./utils.js";

// Обработчик закрытия всех попапов
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("close-button")
    ) {
      closePopup(popup);
    }
  });
});

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция сброса полей ошибок при открытии попапа
function resetErrorValue(formElement, ...inputElements) {
  const errorElements = formElement.querySelectorAll(`.edit-form__item-error`);
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
  });
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove("edit-form__item_type_error");
  });
}

// Слушатель кнопки редактирования профиля
editButton.addEventListener("click", () => {
  setProfileInputValue();
  resetErrorValue(editForm, nameInput, jobInput);
  openPopup(popupTypeProfile);
});

// Функция валидации форм
function validateForm(form) {
  const formValidator = new FormValidator(validationObject, form);
  formValidator.enableValidation();
}

// Слушатель кнопки добавления фото
addButton.addEventListener("click", () => {
  photoForm.reset();
  validateForm(photoForm);
  resetErrorValue(photoForm, placeInput, photoInput);
  openPopup(popupTypeAddPhoto);
});

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupTypeProfile);
}

// Валидация формы редактирования профиля
validateForm(editForm);

// Слушатель формы редактирования профиля
editForm.addEventListener("submit", handleProfileFormSubmit);

// Функция отрисовки карточек из массива
function renderCards(array) {
  array.forEach((el) => {
    const card = new Card(el.link, el.name, "#card-template");
    photosCards.append(card.createCardElement(el.link, el.name));
  });
}

// Отрисовка дефолтных карточек
renderCards(initialCards);

// Обработчик формы добавления карточки
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(photoInput.value, placeInput.value, "#card-template");
  photosCards.prepend(
    card.createCardElement(photoInput.value, placeInput.value)
  );
  evt.target.reset();
  closePopup(popupTypeAddPhoto);
}

// Слушатель формы добавления карточки
photoForm.addEventListener("submit", handlePhotoFormSubmit);
