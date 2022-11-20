import { PopupWithImage } from "./PopupWithImage";
import { Card } from "./Card.js";
import { fullPhoto, fullPhotoContainerCaption } from "./constants";

// Функция создания новой карточки
export function createCard(item) {
  const card = new Card(item.link, item.name, "#card-template", {
    handleCardClick: () => {
      const fullPhotoContainer = new PopupWithImage(
        ".popup_type_photo",
        item.link,
        item.name
      );

      fullPhotoContainer.setEventListeners();
      fullPhotoContainer.open(fullPhoto, fullPhotoContainerCaption);
    },
  });
  return card.createCardElement();
}
