export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    // this._nameSelector = nameSelector;
    // this._jobSelector = jobSelector;
    // this._nameInput = document.querySelector(this._nameSelector);
    // this._jobInput = document.querySelector(this._jobSelector);
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    // this._userId = userId;
  }

  // Метод, который возвращает объект с данными пользователя
  getUserInfo() {
    // this._nameInput.value = profileTitle.textContent;
    // this._jobInput.value = profileSubtitle.textContent;
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    }
  }

  // Метод, который добавляет данные пользователя на страницу
  setUserInfo(name, job /*, avatar*/) {
    this._name.textContent = name;
    this._job.textContent = job
  }

  // Метод, который добавляет аватар на страницу
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}