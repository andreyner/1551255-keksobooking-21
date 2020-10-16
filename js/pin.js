"use strict";
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
const PIN_COUNT = 8;

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


let drowPins = function () {
  for (let index = 0; index < PIN_COUNT; index++) {
    let poster = convertJStoDOM(window.data.source(index + 1));
    pinfragment.appendChild(poster);
  }
  mapPins.appendChild(pinfragment);
};

window.pin = {
  showPins: drowPins
};
