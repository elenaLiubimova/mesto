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
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
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
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
}