export class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
	}

	open(popup) {
		popup.classList.add("popup_opened");
		document.addEventListener("keydown", closePopupByEscapeButton);
	}

	close(popup) {
		popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", closePopupByEscapeButton);
	}

	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			const openedPopup = document.querySelector(".popup_opened");
			closePopup(openedPopup);
		}
	}

	setEventListeners(popups) {
		popups.forEach((popup) => {
			popup.addEventListener("mousedown", (evt) => {
				if (
					evt.target.classList.contains("popup_opened") ||
					evt.target.classList.contains("close-button")
				) {
					closePopup(popup);
				}
			});
		});
	}
}