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

// Функция установки слушателей полям ввода
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__item'));
  const buttonElement = formElement.querySelector('.save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция валидации форм
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

// Функция проверки на невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('save-button_disabled');
  } else {
    buttonElement.classList.remove('save-button_disabled');
  }
}