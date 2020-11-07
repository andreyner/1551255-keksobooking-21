"use strict";

const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const MAP_PINS = document.querySelector(`.map__pins`);
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

window.pinRender = {
  drowPins: function (cards) {
    for (let index = 0; index < cards.length; index++) {
      let poster = convertJStoDOM(cards[index]);
      window.cardDeatail.pinOnClickHandler(poster, cards[index]);
      pinfragment.appendChild(poster);
    }
    MAP_PINS.appendChild(pinfragment);
  },
  clear: function () {
    window.cardDeatail.clearCardDeatail();
    let addedpins = MAP_PINS.querySelectorAll('.map__pin');
    for (let index = addedpins.length - 1; index > 0; index--) {
      if (addedpins[index].className !== "map__pin map__pin--main") {
        addedpins[index].remove();
      }
    }
  }
};
