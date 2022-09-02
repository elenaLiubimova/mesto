let editButton = document.querySelector('.edit-button');
let popup = document.querySelector('.popup')
let popupCloseButton = popup.querySelector('.popup__close-button');
let editForm = document.querySelector('.edit-form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = editForm.elements.name;
let jobInput = editForm.elements.job;
let nameInputValue = nameInput.value;
let jobInputValue = jobInput.value;
      
editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputValue = nameInput.value;
  jobInputValue = jobInput.value;
  profileTitle.textContent = nameInputValue;
  profileSubtitle.textContent = jobInputValue;
  popup.classList.remove('popup_opened')
}

editForm.addEventListener('submit', formSubmitHandler);