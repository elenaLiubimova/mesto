export class FormValidator {
  constructor(validationObject, formElement) {
    this._validationObject = validationObject;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationObject.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationObject.submitButtonSelector
    );
  }

  //Метод вывода ошибки
  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass } = this._validationObject;
    const { errorClass } = this._validationObject;
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(errorClass);
  }

  // Метод удаления ошибки
  _hideInputError(inputElement) {
    const { inputErrorClass } = this._validationObject;
    const { errorClass } = this._validationObject;
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    inputElement.classList.remove(errorClass);
    this._errorElement.textContent = "";
  }

  // Метод проверки валидности поля
  _checkInputValidity(inputElement) {
    const { formSelector, ...rest } = this._validationObject;
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция проверки на невалидное поле
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция переключения состояния кнопки
  _toggleButtonState() {
    const { inactiveButtonClass } = this._validationObject;
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Метод установки слушателей полям ввода
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Метод валидации форм (публичный)
  enableValidation() {
    const { formSelector } = this._validationObject;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((_formElement) => {
      this._setEventListeners();
    });
  }
}