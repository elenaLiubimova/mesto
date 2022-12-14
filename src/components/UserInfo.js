export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Метод, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  // Метод, который добавляет данные пользователя на страницу
  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  // Метод, который добавляет аватар на страницу
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}