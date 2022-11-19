import { PopupWithImage } from "./PopupWithImage.js";
import { Card } from "./Card.js";
import { fullPhoto, fullPhotoContainerCaption } from "./constants.js";

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
  console.log(card);
  return card.createCardElement();
}
