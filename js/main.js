"use strict";
const PHOTO_REFERENCES =
  [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
const TIMES_SELECTOR =
  [
    '12:00',
    '13:00',
    '14:00'
  ];
const PIN_LOCATION = {
  Xmin: 0,
  Xmax: 1000,
  Ymin: 130,
  Ymax: 630
};
const APARTMENT_TYPE =
  [
    'palace',
    'flat',
    'house',
    'bungalow'
  ];

const PRICE =
{
  MIN: 1,
  MAX: 1000
};
const FEATURES =
  [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
const PIN_COUNT = 8;
const MAP_PIN_WIDTH = document.querySelector('.map__pin').getBoundingClientRect().width;
const MAP_PIN_HEIGHT = document.querySelector('.map__pin').getBoundingClientRect().height;

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

let getJSMOK = function (posterCount) {
  let locationX0 = window.util.getRandomInRange(PIN_LOCATION.Xmin, PIN_LOCATION.Xmax);
  let locationY0 = window.util.getRandomInRange(PIN_LOCATION.Ymin, PIN_LOCATION.Ymax);
  let photoCount = window.util.getRandomInRange(0, PHOTO_REFERENCES.length - 1);
  let featureCount = window.util.getRandomInRange(0, FEATURES.length - 1);
  return {
    "author": {
      "avatar": `img/avatars/user0${posterCount}.png`
    },
    "offer": {
      "title": `какое то предложение`,
      "address": `` + locationX0 + `, ` + locationY0,
      "price": window.util.getRandomInt(PRICE.MIN, PRICE.MAX),
      "type": APARTMENT_TYPE[window.util.getRandomInRange(0, APARTMENT_TYPE.length - 1)],
      "rooms": 0,
      "guests": 0,
      "checkin": TIMES_SELECTOR[window.util.getRandomInRange(0, TIMES_SELECTOR.length - 1)],
      "checkout": TIMES_SELECTOR[window.util.getRandomInRange(0, TIMES_SELECTOR.length - 1)],
      "features": getArrayRange(FEATURES, 0, featureCount),
      "description": `какое то описание`,
      "photos": getArrayRange(PHOTO_REFERENCES, 0, photoCount),
    },
    "location": {
      "x": locationX0 - MAP_PIN_WIDTH / 2,
      "y": locationY0 - MAP_PIN_HEIGHT
    }
  };
};

let getArrayRange = function (array, startIndex, endIndex) {
  return array.filter(function (elem, index) {
    if (index > endIndex || index < startIndex) {
      return false;
    }
    return true;
  });

};

let convertJStoDOM = function (domObject) {
  let newPin = pinTemplate.cloneNode(true);
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


(function () {
  document.querySelector('.map').classList.remove('map--faded');
  for (let index = 0; index < PIN_COUNT; index++) {
    let poster = convertJStoDOM(getJSMOK(index + 1));
    pinfragment.appendChild(poster);
  }
  mapPins.appendChild(pinfragment);
}
)();
