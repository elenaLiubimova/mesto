export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch((error) => console.log(`Ошибка: ${error}`));
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch((error) => console.log(`Ошибка: ${error}`));
  }

  setProfileInfo(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch((error) => console.log(`Ошибка: ${error}`));
  }
}