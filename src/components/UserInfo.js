export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._nameInput = document.querySelector(this._nameSelector);
    this._jobInput = document.querySelector(this._jobSelector);
  }

  getUserInfo(profileTitle, profileSubtitle) {
    this._nameInput.value = profileTitle.textContent;
    this._jobInput.value = profileSubtitle.textContent;
  }

  setUserInfo(profileTitle, profileSubtitle) {
    profileTitle.textContent = this._nameInput.value;
    profileSubtitle.textContent = this._jobInput.value;
    // this._nameInput.textContent = profileTitle;
    // this._jobInput.textContent = profileSubtitle;
  }
}