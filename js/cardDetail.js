"use strict";
const CARD_DETAIL = document.querySelector(`#card`).content.querySelector(`.map__card`).cloneNode(true);
const CARD_DETAIL_CLOSE = CARD_DETAIL.querySelector('.popup__close');
const MAP = document.querySelector(`.map`);
const APPARTMENT_PHOTO =
{
  Height: 40,
  Width: 45
};
const TYPE_APPRTMENT_MAP =
{
  "bungalow": "Бунгало",
  "flat": "Квартира",
  "house": "Дом",
  "palace": "Дворец"

};
(function () {
  let closeCardDetailKewDown = function (evt1) {
    if (evt1.key === 'Escape') {
      closeCardDetail(evt1);
    }
  };
  document.addEventListener('keydown', closeCardDetailKewDown);
  let closeCardDetailClick = function (evt1) {
    closeCardDetail(evt1);
  };
  CARD_DETAIL_CLOSE.addEventListener("click", closeCardDetailClick);

})();
let closeCardDetail = function (evt1) {
  evt1.preventDefault();
  CARD_DETAIL.style.display = 'none';
};
let pinOnClick = function (pin, data) {
  pin.addEventListener('click', function (evt) {
    evt.preventDefault();
    CARD_DETAIL.style.display = '';
    CARD_DETAIL.querySelector('.popup__avatar').src = data.author.avatar;
    CARD_DETAIL.querySelector('.popup__title').textContent = data.offer.title;
    CARD_DETAIL.querySelector('.popup__text--address').textContent = data.offer.address;
    CARD_DETAIL.querySelector('.popup__text--price').textContent = `${data.offer.price}₽/ночь`;

    CARD_DETAIL.querySelector('.popup__type').textContent = (data.offer.type !== undefined && TYPE_APPRTMENT_MAP[data.offer.type] !== undefined) ? TYPE_APPRTMENT_MAP[data.offer.type] : "";
    let capacity = CARD_DETAIL.querySelector('.popup__text--capacity');
    if (data.offer.rooms === 0 && data.offer.guests === 0) {
      capacity.style.visibility = "hidden";
    } else {
      capacity.style.visibility = "visible";
    }
    capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    let time = CARD_DETAIL.querySelector('.popup__text--time');
    if (data.offer.checkin === "0:00" && data.offer.checkout === "0:00") {
      time.style.visibility = "hidden";
    } else {
      time.style.visibility = "visible";
    }
    time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
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
    MAP.appendChild(CARD_DETAIL);
  });
};

window.cardDeatail =
{
  pinOnClickHandler: pinOnClick,
  clearCardDeatail: function () {
    CARD_DETAIL.style.display = 'none';
  }

};