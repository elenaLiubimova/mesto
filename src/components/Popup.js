export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  // Функция открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  // Функция закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._popup._handleEscClose);
  }

  // Функция закрытия попапа кнопкой Escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Функция добавления слушателей формы
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("close-button")
      ) {
        this.close();
      }
    });
  }
}