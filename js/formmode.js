"use strict";
const btnPin = document.querySelector(`.map__pin.map__pin--main`);
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeature = document.querySelector('.map__features');
const address = document.getElementById('address');
const pinWidth = 65;
const pinHeight = 65 + 22;
let formIsActive = false;
btnPin.onmousedown = function (event) {

  let shiftX = event.clientX - btnPin.getBoundingClientRect().left + 50.5;
  let shiftY = event.clientY - btnPin.getBoundingClientRect().top;
  function moveAt(pageX, pageY) {
    btnPin.style.left = pageX - shiftX + `px`;
    btnPin.style.top = pageY - shiftY + `px`;
    setAddress();
  }
  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }
  if (event.which === 1) {
    activateForm();
    moveAt(event.pageX, event.pageY);
    document.addEventListener(`mousemove`, onMouseMove);

    btnPin.onmouseout = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      btnPin.mouseout = null;
    };
    btnPin.onmouseup = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      btnPin.onmouseup = null;
    };

    document.querySelector(`.map`).classList.remove(`map--faded`);
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);

  }
};
btnPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateForm();
  }
});
let activateForm = function () {
  if (!formIsActive) {
    formIsActive = true;
    window.activemode.showAdvertise();
    setFormMode(false);
    setAddress();
    address.readOnly = true;
  }
};

let setFormMode = function (isdisabled) {
  for (let index = 0; index < adFormElements.length; index++) {
    adFormElements[index].disabled = isdisabled;
  }
  for (let index = 0; index < mapFilters.length; index++) {
    mapFilters[index].disabled = isdisabled;
  }
  mapFeature.disabled = isdisabled;

};

let setAddress = function () {
  address.value = `${Math.round(parseInt(btnPin.style.left, 10) + pinWidth / 2)}, ${Math.round(parseInt(btnPin.style.top, 10) + pinHeight)}`;

};

let disableForm = function () {
  setFormMode(true);
  setAddress();
};

disableForm();
