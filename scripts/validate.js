// Объект классов элементов
const validationObject = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__item",
  submitButtonSelector: ".save-button",
  inactiveButtonClass: "save-button_disabled",
  inputErrorClass: "edit-form__item_type_error",
  errorClass: "edit-form__item-error_active",
};

//Функция вывода ошибки
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationObj
) {
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
  errorElement.textContent = "";
}

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement, validationObj) {
  const { formSelector, ...rest } = validationObj;
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationObj
    );
  } else {
    hideInputError(formElement, inputElement, validationObj);
  }
}

// Функция переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, validationObj) {
  const { inactiveButtonClass } = validationObj;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция установки слушателей полям ввода
function setEventListeners(formElement, validationObj) {
  const { inputSelector } = validationObj;
  const { submitButtonSelector } = validationObj;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
}

// Функция валидации форм
function enableValidation(validationObj) {
  const { formSelector } = validationObj;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationObj);
  });
}

enableValidation(validationObject);

// Функция проверки на невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
