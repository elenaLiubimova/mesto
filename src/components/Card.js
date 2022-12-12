export class Card {
  constructor(
    link,
    name,
    likes,
    id,
    userId,
    ownerId,
    cardTemplateSelector,
    { handleCardClick, handleDeleteButtonClick, handleLikeButtonClick }
  ) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
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
    this._cardLikeCounter = this.cardElement.querySelector(
      ".card__like-counter"
    );
  }

  // Метод обработки удаления карточки
  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  //Метод определения, лайкнул ли текущий пользователь карточку
  isLiked() {
    const cardIsLiked = this._likes.find((user) => user._id === this._userId);

    return cardIsLiked;
  }

  // Метод подсчета лайков
  countLikes(likes) {
    this._likes = likes;
    this._cardLikeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._setLike();
    } else {
      this._setDislike();
    }
  }

  //Метод для закрашивания иконки лайка
  _setLike() {
    this._likeButton.classList.remove("like-button_inactive");
  }

  //Метод для снятия закрашивания иконки лайка
  _setDislike() {
    this._likeButton.classList.add("like-button_inactive");
  }

  // Метод наложения обрабочиков событий
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButtonClick(this._id)
    );
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButtonClick(this._id)
    );
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  // Публичный метод, который возвращает работоспособный и наполненный данными элемент карточки
  createCardElement() {
    this._getMarkupFromTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this.countLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this.cardElement.querySelector(".delete-button").disabled = true;
      this.cardElement.querySelector(".delete-button").style.display = "none";
    }
    return this.cardElement;
  }
}