import { Popup } from "./Popup.js";

export class popupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.edit-form__item');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners(forms, popups) {
    forms.forEach((form) => {
      form.addEventListener("submit", this.handleFormSubmit);
    });
    
    super.setEventListeners(popups);
  }

  close(form) {
    form.reset();
    super.close();
  }
}