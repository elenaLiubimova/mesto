let editButton=document.querySelector('.edit-button');
let popup=document.querySelector('.popup')
let popupCloseButton=popup.querySelector('.popup__close-button');
let formElement=document.querySelector('.edit-form');
let profileName=document.querySelector('.profile__title');
let profileJob=document.querySelector('.profile__subtitle');
let nameInput=formElement.elements.name;
let jobInput=formElement.elements.job;
let nameInputValue=nameInput.value;
let jobInputValue=jobInput.value;
      
editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value=profileName.textContent;
  jobInput.value=profileJob.textContent;
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
evt.preventDefault();

nameInputValue=nameInput.value;
jobInputValue=jobInput.value;

profileName.textContent=nameInputValue;
profileJob.textContent=jobInputValue;
popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler);