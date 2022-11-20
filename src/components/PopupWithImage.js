import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  open(image, caption) {
    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;
    super.open();
  }
}