export class Section {
  constructor(selector) {
    this._selector = selector;
    this._container = document.querySelector(this._selector);
  }

  //Метод добавления карточки в контейнер
  addItem(item) {
    this._container.prepend(item);
  }

  //Метод добавления дефолтной карточки в контейнер
  addDefaultItem(item) {
    this._container.append(item);
  }
}