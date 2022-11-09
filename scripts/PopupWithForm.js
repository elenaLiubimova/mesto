import { Popup } from "./Popup.js";

export class popupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {

  }

  setEventListeners() {

  }

  close(popup) {
    
    super.close(popup);
  }
}