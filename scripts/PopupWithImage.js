import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  open(popup) {
    fullPhoto.src = this._link;
    fullPhoto.alt = this._name;
    fullPhotoContainerCaption.textContent = this._name;
    super.open(popup);
	}
}