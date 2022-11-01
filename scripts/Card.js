import { openPopup } from "./utils.js";
import {
  popupTypePhoto,
  fullPhoto,
  fullPhotoContainerCaption,
} from "./constants.js";

export class Card {
  constructor(link, name, cardTemplateSelector) {
    this._link = link;
    this._name = name;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  // Метод получения разметки из темплейта
  _getMarkupFromTemplate() {
    this._cardTemplate = document.querySelector(
      this._cardTemplateSelector
    ).content;
    this.cardElement = this._cardTemplate
      .querySelector(".card")
      .cloneNode(true);
    this._cardImage = this.cardElement.querySelector(".card__image");
    this._cardTitle = this.cardElement.querySelector(".card__title");
    this._deleteButton = this.cardElement.querySelector(".delete-button");
    this._likeButton = this.cardElement.querySelector(".like-button");
  }

  // Метод обработки удаления карточки
  _deleteCard() {
    const cardItem = this._deleteButton.closest(".card");
    cardItem.remove();
  }

  // Метод обработки лайка
  _toggleLike() {
    this._likeButton.classList.toggle("like-button_inactive");
  }

  // Метод открытия полноразмерного фото в отдельном попапе
  _openFullPhoto(link, name) {
    openPopup(popupTypePhoto);
    fullPhoto.src = link;
    fullPhoto.alt = name;
    fullPhotoContainerCaption.textContent = name;
  }

  // Метод наложения обрабочиков событий
  _setEventListeners(link, name) {
    this._deleteButton.addEventListener("click", () => this._deleteCard());
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._cardImage.addEventListener("click", () =>
      this._openFullPhoto(link, name)
    );
  }

  // Публичный метод, который возвращает работоспособный и наполненный данными элемент карточки
  createCardElement(link, name) {
    this._getMarkupFromTemplate();
    this._setEventListeners(link, name);
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;
    return this.cardElement;
  }
}