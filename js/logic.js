"use strict";

let btnmark = document.querySelector(".map__pin.map__pin--main");
btnmark.onmousedown = function (event) {

  let shiftX = event.clientX - btnmark.getBoundingClientRect().left + 50.5;
  let shiftY = event.clientY - btnmark.getBoundingClientRect().top;
  function moveAt(pageX, pageY) {
    btnmark.style.left = pageX - shiftX + 'px';
    btnmark.style.top = pageY - shiftY + 'px';
  }
  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }
  if (event.which === 1) {
    moveAt(event.pageX, event.pageY);
    document.addEventListener('mousemove', onMouseMove);

    btnmark.onmouseout = function () {
      document.removeEventListener('mousemove', onMouseMove);
      btnmark.mouseout = null;
    };
    btnmark.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      btnmark.onmouseup = null;
    };

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  }
};


