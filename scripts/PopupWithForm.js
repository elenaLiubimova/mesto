import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.forms = document.forms
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.edit-form__item');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners(form) {
    console.log(form);
    form.addEventListener("submit", this.handleFormSubmit);

    super.setEventListeners();
  }

  // close(form) {
  //   console.log(form);
  //   // form.reset();
    
  //   super.close();
  // }
}