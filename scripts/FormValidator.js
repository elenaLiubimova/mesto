class formValidator {
  constructor(validationObject, formElement) {
    this._validationObject = validationObject;
    this.formElement = formElement;
  }

  // Метод валидации форм (публичный)
  enableValidation() {
    const { formSelector } = this._validationObject;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, this._validationObject);
    });
  }
}