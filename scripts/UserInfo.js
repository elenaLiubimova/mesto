export class UserInfo {
  constructor(nameInputValue, jobInputValue) {
    this._nameInputValue = nameInputValue;
    this._jobInputValue = jobInputValue;
  }

  getUserinfo(profileTitle, profileSubtitle) {
    this._userInfo = {};

    this._userInfo[this._nameInputValue] = profileTitle.textContent;
    this._userInfo[this._jobInputValue] = profileSubtitle.textContent;

    return this._userInfo;
  }

  setUserInfo(profileTitle, profileSubtitle) {
    profileTitle.textContent = this._userInfo[this._nameInputValue];
    profileSubtitle.textContent = this._userInfo[this._jobInputValue];
  }
}