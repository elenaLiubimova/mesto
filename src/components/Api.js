class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '8a554e8c-b62c-42c8-9826-7b4251a96cc4',
    'Content-Type': 'application/json'
  }
});