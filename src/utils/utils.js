import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { fullPhoto, fullPhotoContainerCaption } from "./constants";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { api } from "../pages/index.js";

const popupWithConfirm = new PopupWithConfirm(".popup_type_confirm", {
  handleConfirmClick: (id) => {
    api.deleteCard(id)
      .then(res => {
        console.log(res);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  },
});

// Функция создания новой карточки
export function createCard(item) {
  const card = new Card(item.link, item.name, item.likes, item._id, "#card-template", {
    handleCardClick: () => {
      const fullPhotoContainer = new PopupWithImage(
        ".popup_type_photo",
        item.link,
        item.name,
      );

      fullPhotoContainer.setEventListeners();
      fullPhotoContainer.open(fullPhoto, fullPhotoContainerCaption);
    },

    handleDeleteButtonClick: (id) => {
      popupWithConfirm.open();
      popupWithConfirm.setEventListeners(id);
    }
  });
  return card.createCardElement();
}