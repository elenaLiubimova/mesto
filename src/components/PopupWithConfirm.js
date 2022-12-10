import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleConfirmClick }) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._submitButton = this._popup.querySelector(".save-button");
  }
  
  _clickEvent(id) {
    this._handleConfirmClick(id);
  }

  // handleConfirmClick(deleteCardFunction) {
  //   this.handleConfirmClick = deleteCardFunction;
  // }

  setEventListeners(id) {
    this._submitButton.addEventListener("click", () => {
      this._clickEvent(id);
      this.close();
    });

    super.setEventListeners(id);
  }
}