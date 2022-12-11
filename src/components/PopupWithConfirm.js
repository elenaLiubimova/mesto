import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleConfirmClick }) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._submitButton = this._popup.querySelector(".save-button");
  }

  _clickEvent(id, card) {
    this._handleConfirmClick(id, card);
  }

  setEventListeners(id, card) {
    this._submitButton.addEventListener("click", () => {
      this._clickEvent(id, card);
      this.close();
    });

    super.setEventListeners(id, card);
  }
}