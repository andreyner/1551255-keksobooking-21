"use strict";

const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const MAP_PINS = document.querySelector(`.map__pins`);
const CARD_DETAIL = document.querySelector(`#card`).content.querySelector(`.map__card`).cloneNode(true);
const MAP = document.querySelector(`.map`);
const CARD_DETAIL_CLOSE = CARD_DETAIL.querySelector('.popup__close');
const APPARTMENT_PHOTO =
{
  Height: 40,
  Width: 45
};

let convertJStoDOM = function (domObject) {
  let newPin = PIN_TEMPLATE.cloneNode(true);
  newPin.style = `left: ${domObject.location.x}px; top: ${domObject.location.y}px;`;

  for (let index = 0; index < newPin.children.length; index++) {
    if (newPin.children[index].src !== undefined) {
      newPin.children[index].src = domObject.author.avatar;
      newPin.children[index].alt = `Заголовок объявления`;
    }
  }
  return newPin;
};

let pinfragment = document.createDocumentFragment();


let pinOnClick = function (pin, data) {
  pin.addEventListener('click', function () {
    CARD_DETAIL.style.display = '';
    CARD_DETAIL.querySelector('.popup__avatar').src = data.author.avatar;
    CARD_DETAIL.querySelector('.popup__title').textContent = data.offer.title;
    CARD_DETAIL.querySelector('.popup__text--address').textContent = data.offer.address;
    CARD_DETAIL.querySelector('.popup__text--price').textContent = `${data.offer.price}/ночь`;
    CARD_DETAIL.querySelector('.popup__type').textContent = data.offer.type;
    CARD_DETAIL.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    CARD_DETAIL.querySelector('.popup__text--time').textContent = `Заезд ${data.offer.checkin}, выезд ${data.offer.checkout}`;
    let features = CARD_DETAIL.querySelector('.popup__features');
    for (let index = features.children.length - 1; index > 0; index--) {
      let sepstr = features.children[index].className.split('-', 3);
      if (data.offer.features === undefined || sepstr.length !== 3 || !data.offer.features.some((x) => x === sepstr[2])) {
        features.children[index].style.display = 'none';
      } else {
        features.children[index].style.display = '';
      }
    }

    CARD_DETAIL.querySelector('.popup__description').textContent = data.offer.description;
    let photos = CARD_DETAIL.querySelector('.popup__photos');
    while (photos.firstChild) {
      photos.firstChild.remove();
    }
    let photosfragment = document.createDocumentFragment();
    for (let index = 0; index < data.offer.photos.length; index++) {
      let image = document.createElement("img");
      image.className = "popup__photo";
      image.src = data.offer.photos[index];
      image.width = APPARTMENT_PHOTO.Width;
      image.height = APPARTMENT_PHOTO.Height;
      photosfragment.appendChild(image);
    }
    photos.appendChild(photosfragment);

    CARD_DETAIL_CLOSE.addEventListener("click", function () {
      closeCardDetail();
    });
  });
  let closeCardDetail = function () {
    CARD_DETAIL.style.display = 'none';
    CARD_DETAIL_CLOSE.removeEventListener("click", closeCardDetail);
  };

  MAP.appendChild(CARD_DETAIL);
};

window.pinRender = {
  drowPins: function (cards) {
    for (let index = 0; index < cards.length; index++) {
      let poster = convertJStoDOM(cards[index]);
      pinOnClick(poster, cards[index]);
      pinfragment.appendChild(poster);
    }
    MAP_PINS.appendChild(pinfragment);
  },
  clear: function () {
    CARD_DETAIL.style.display = 'none';
    let addedpins = MAP_PINS.querySelectorAll('.map__pin');
    for (let index = addedpins.length - 1; index > 0; index--) {
      if (addedpins[index].className !== "map__pin map__pin--main") {
        addedpins[index].remove();
      }
    }
  }
};
