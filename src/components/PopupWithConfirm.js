import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".save-button");
  }

  clickEvent(callback) {
    this._handleConfirmButton = callback;
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", () => {
      this._handleConfirmButton();
    });

    super.setEventListeners();
  }
}