export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  //Метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //Метод добавления карточки в контейнер
  addItem(item) {
    document.querySelector(this._selector).prepend(item);
  }

  //Метод добавления дефолтной карточки в контейнер
  addDefaultItem(item) {
      document.querySelector(this._selector).append(item);
  }
}