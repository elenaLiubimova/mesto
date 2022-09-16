const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const editButton = document.querySelector('.edit-button');
const nameInput = document.forms.profile.elements.name;
const jobInput = document.forms.profile.elements.job;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const photosCards = document.querySelector('.photos__cards');
const addButton = document.querySelector('.add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeAddPhoto = document.querySelector('.popup_type_add-photo');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const closeButtonTypeProfile = popupTypeProfile.querySelector('.close-button');
const closeButtonTypeAddPhoto = popupTypeAddPhoto.querySelector('.close-button');
const editForm = document.forms.profile;
const photoForm = document.forms.photo;

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция установки имени из профиля при открытии формы
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// "Слушатель" кнопки редактирования профиля 
editButton.addEventListener('click', () => {setProfileInputValue(); openPopup(popupTypeProfile)});

// "Слушатель" кнопки открытия фото 
addButton.addEventListener('click', () => {openPopup(popupTypeAddPhoto)});

// "Слушатель" кнопки закрытия попапа формы редактирования профиля
closeButtonTypeProfile.addEventListener('click', () => closePopup(popupTypeProfile));

// "Слушатель" кнопки закрытия попапа формы добавления фото
closeButtonTypeAddPhoto.addEventListener('click', () => closePopup(popupTypeAddPhoto));

// Обработчик формы редактирования профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupTypeProfile);
}

// "Слушатель" формы редактирования профиля
editForm.addEventListener('submit', formProfileSubmitHandler);

// Функция удаления карточки
function deleteCard(button) {
  const cardItem = button.closest('.card');
  cardItem.remove();
}

// Функция переключения лайка
function toggleLike(button) {
  button.classList.toggle('like-button_inactive');
}

// Функция открытия пороразмерного фото в отдельном попапе
function openFullPhoto(link, name) {
  openPopup(popupTypePhoto);
  const fullPhoto = document.querySelector('.full-photo');
  const fullPhotoContainerCaption = document.querySelector('.full-photo-container__caption');
  fullPhoto.src = link;
  fullPhoto.alt = name;
  fullPhotoContainerCaption.textContent = name;
}

// Функция создания карточки и добавления "слушателей" ее элементам
function createCardElement(link, name) {
  const closeButtonTypePhoto = popupTypePhoto.querySelector('.close-button');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => deleteCard(deleteButton));
  const likeButton = cardElement.querySelector('.like-button');
  likeButton.addEventListener('click', () => toggleLike(likeButton));
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardImage.addEventListener('click', () => openFullPhoto(link, name));
  closeButtonTypePhoto.addEventListener('click', () => closePopup(popupTypePhoto));
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

// Функция очистки формы
function resetForm (form) {
  form.reset();
}

// Обработчик формы добавления карточки
function formPhotoSubmitHandler (evt) {
  const placeInput = document.forms.photo.elements.place;
  const photoInput = document.forms.photo.elements.photo;
  evt.preventDefault();
  photosCards.prepend(createCardElement(photoInput.value, placeInput.value));
  resetForm (photoForm);
  popupTypeAddPhoto.classList.remove('popup_opened');
}

// "Слушатель" формы добавления карточки
photoForm.addEventListener('submit', formPhotoSubmitHandler);