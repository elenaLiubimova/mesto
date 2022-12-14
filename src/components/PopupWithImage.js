import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullPhoto = document.querySelector(".full-photo");
    this._fullPhotoContainerCaption = document.querySelector(
      ".full-photo-container__caption"
    );
  }

  open(link, name) {
    this._fullPhoto.src = link;
    this._fullPhoto.alt = name;
    this._fullPhotoContainerCaption.textContent = name;
    super.open();
  }
}