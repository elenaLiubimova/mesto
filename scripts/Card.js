export class Card {
  constructor(link, name, cardTemplateSelector, { handleCardClick } ) {
    this._link = link;
    this._name = name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
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
    this.cardElement.remove();
    this.cardElement = null;
  }

  // Метод обработки лайка
  _toggleLike() {
    this._likeButton.classList.toggle("like-button_inactive");
  }

  // Метод наложения обрабочиков событий
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._deleteCard());
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick()
    );
  }

  // Публичный метод, который возвращает работоспособный и наполненный данными элемент карточки
  createCardElement() {
    this._getMarkupFromTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this.cardElement;
  }
}