// Объект классов элементов
const validationObject = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.save-button',
  inactiveButtonClass: 'save-button_disabled',
  inputErrorClass: 'edit-form__item_type_error',
  errorClass: 'edit-form__item-error_active',
}

//Функция вывода ошибки
function showInputError(formElement, inputElement, errorMessage, validationObj) {
  const { inputErrorClass } = validationObj;
  const { errorClass } = validationObj;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция удаления ошибки
function hideInputError(formElement, inputElement, validationObj) {
  const { inputErrorClass } = validationObj;
  const { errorClass } = validationObj;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
};

// Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, validationObj) {
  const { inactiveButtonClass } = validationObj;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Функция установки слушателей полям ввода
function setEventListeners(formElement, validationObj) {
  const { inputSelector } = validationObj;
  const { submitButtonSelector } = validationObj;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
}

// Функция валидации форм
function enableValidation(validationObj) {
  const { formSelector } = validationObj;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, validationObject);
  });
}

enableValidation(validationObject);

// Функция проверки на невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}