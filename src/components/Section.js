export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector)
  }

  //Метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
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