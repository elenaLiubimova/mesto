export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    this._inputList = document.querySelectorAll('.edit-form__item');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setUserInfo(profileTitle, profileSubtitle) {
    this._nameInput = document.querySelector(this._nameSelector);
    this._jobInput = document.querySelector(this._jobSelector);

    profileTitle.textContent = this._nameInput.value;
    profileSubtitle.textContent = this._jobInput.value;
  }
}