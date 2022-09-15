const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeAddPhoto = document.querySelector('.popup_type_add-photo');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const closeButtonTypeProfile = popupTypeProfile.querySelector('.close-button');
const closeButtonTypeAddPhoto = popupTypeAddPhoto.querySelector('.close-button');
const closeButtonTypePhoto = popupTypePhoto.querySelector('.close-button');
const editForm = document.forms.profile;
const photoForm = document.forms.photo;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const nameInput = document.forms.profile.elements.name;
const jobInput = document.forms.profile.elements.job;
function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', () => {setProfileInputValue()});

editButton.addEventListener('click', () => {openPopup(popupTypeProfile)});

addButton.addEventListener('click', () => {openPopup(popupTypeAddPhoto)});

closeButtonTypeProfile.addEventListener('click', () => closePopup(popupTypeProfile));

closeButtonTypeAddPhoto.addEventListener('click', () => closePopup(popupTypeAddPhoto));

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupTypeProfile.classList.remove('popup_opened');
}

editForm.addEventListener('submit', formProfileSubmitHandler);


photoForm.addEventListener('submit', formPhotoSubmitHandler);

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

const photosCards = document.querySelector('.photos__cards');
const cardTemplate = document.querySelector('#card-template').content;

let cardElement;
let cardImage;
let cardTitle;
let elementLink;
let elementName;

//функция создания карточки
function createCardElement(link, name) {
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardImage = cardElement.querySelector('.card__image');
  cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function() {
      let cardItem = deleteButton.closest('.card');
      cardItem.remove();
  });
  let likeButton = cardElement.querySelector('.like-button');
  likeButton.addEventListener('click', function() {
      likeButton.classList.toggle('like-button_inactive');
  });
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardImage.addEventListener('click', () => {
    openPopup(popupTypePhoto);
    const fullPhoto = document.querySelector('.full-photo');
    fullPhoto.src = el.link;
  });
  closeButtonTypePhoto.addEventListener('click', () => closePopup(popupTypePhoto));
}

// отрисовка дефолтных карточек
initialCards.forEach((el) => {
  createCardElement(el.link, el.name);
  photosCards.append(cardElement);
});

// отрисовка карточки из формы
const placeInput = document.forms.photo.elements.place;
const photoInput = document.forms.photo.elements.photo;
function formPhotoSubmitHandler (evt) {
  evt.preventDefault();
  createCardElement(photoInput.value, placeInput.value);
  photosCards.prepend(cardElement);
  photoForm.reset();
  popupTypeAddPhoto.classList.remove('popup_opened');
}