const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const editButton = document.querySelector(".edit-button");
const nameInput = document.forms.profile.elements.name;
const jobInput = document.forms.profile.elements.job;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const photosCards = document.querySelector(".photos__cards");
const addButton = document.querySelector(".add-button");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeAddPhoto = document.querySelector(".popup_type_add-photo");
const popupTypePhoto = document.querySelector(".popup_type_photo");
const editForm = document.forms.profile;
const photoForm = document.forms.photo;
const closeButtons = document.querySelectorAll(".close-button");
const fullPhoto = document.querySelector(".full-photo");
const fullPhotoContainerCaption = document.querySelector(
  ".full-photo-container__caption"
);
const cardTemplate = document.querySelector("#card-template").content;
const placeInput = document.forms.photo.elements.place;
const photoInput = document.forms.photo.elements.photo;

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// "Слушатель" кнопки редактирования профиля
editButton.addEventListener("click", () => {
  setProfileInputValue();
  openPopup(popupTypeProfile);
});

// "Слушатель" кнопки открытия фото
addButton.addEventListener("click", () => {
  openPopup(popupTypeAddPhoto);
});

// Установка "слушателей" на все кнопки закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupTypeProfile);
}

// "Слушатель" формы редактирования профиля
editForm.addEventListener("submit", handleProfileFormSubmit);

// Функция удаления карточки
function deleteCard(button) {
  const cardItem = button.closest(".card");
  cardItem.remove();
}

// Функция переключения лайка
function toggleLike(button) {
  button.classList.toggle("like-button_inactive");
}

// Функция открытия пороразмерного фото в отдельном попапе
function openFullPhoto(link, name) {
  openPopup(popupTypePhoto);
  fullPhoto.src = link;
  fullPhoto.alt = name;
  fullPhotoContainerCaption.textContent = name;
}

// Функция создания карточки и добавления "слушателей" ее элементам
function createCardElement(link, name) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => deleteCard(deleteButton));
  const likeButton = cardElement.querySelector(".like-button");
  likeButton.addEventListener("click", () => toggleLike(likeButton));
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardImage.addEventListener("click", () => openFullPhoto(link, name));
  return cardElement;
}

// функция отрисовки карточек из массива
function renderCards(array) {
  array.forEach((el) => {
    photosCards.append(createCardElement(el.link, el.name));
  });
}

// Отрисовка дефолтных карточек
renderCards(initialCards);

// Обработчик формы добавления карточки
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  photosCards.prepend(createCardElement(photoInput.value, placeInput.value));
  evt.target.reset();
  closePopup(popupTypeAddPhoto);
}

// "Слушатель" формы добавления карточки
photoForm.addEventListener("submit", handlePhotoFormSubmit);
