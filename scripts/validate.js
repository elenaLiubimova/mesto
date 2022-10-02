// const editForm = document.forms.profile;
// const photoForm = document.forms.photo;
// const nameInput = document.forms.profile.elements.name;
// const jobInput = document.forms.profile.elements.job;
// const placeInput = document.forms.photo.elements.place;
// const photoInput = document.forms.photo.elements.photo;
// const formError = editForm.querySelector(`.${nameInput.id}-error`);

//Функция вывода ошибки
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('edit-form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('edit-form__item-error_active');
}

// Функция удаления ошибки
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('edit-form__item_type_error');
  inputElement.classList.remove('edit-form__item-error_active');
  errorElement.textContent = '';
};

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    console.log(inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__item'));
  console.log(inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.edit-form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement);
  });
}

enableValidation();