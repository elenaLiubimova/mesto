import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".edit-form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".edit-form__item");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _submitEvent(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => this._submitEvent(evt));

    super.setEventListeners();
  }

  open() {
    this._form.reset();
    
    super.open();
  }
}