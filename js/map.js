"use strict";
const btnPin = document.querySelector(`.map__pin.map__pin--main`);
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeature = document.querySelector('.map__features');
const address = document.getElementById('address');
const pinWidth = 65;
const pinHeight = 65 + 22;
const pinDecrease = 50.5;
let formIsActive = false;
let mapPinsDOM = [];
const housingType = document.getElementById('housing-type');
const housingPrice = document.getElementById('housing-price');
const housingRooms = document.getElementById('housing-rooms');
const housingGuests = document.getElementById('housing-guests');
const housingFeatures = document.getElementById('housing-features');


let housingTypeFilter = "any";
const MAX_PINS_FILTER = 5;
btnPin.onmousedown = function (event) {

  const shiftX = event.clientX - btnPin.getBoundingClientRect().left + pinDecrease;
  const shiftY = event.clientY - btnPin.getBoundingClientRect().top;
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
    document.onmouseup = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
    };
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
    updatePins();
    setFormMode(false);
    setAddress();
    address.readOnly = true;
    document.querySelector(`.map`).classList.remove(`map--faded`);
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
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


const successHandler = function (data) {
  mapPinsDOM = data;
};
window.backend.load(successHandler, window.util.errorHandler);

window.map = {
  disableForm: function () {
    setFormMode(true);
    setAddress();
  }
};

const updatePins = function () {
  window.pinrender.clear();
  let filteredData = mapPinsDOM.slice().filter(function (x) {
    if (housingTypeFilter !== "any") {
      if (x.offer !== undefined && x.offer.type === housingTypeFilter) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });
  let count = 0;
  filteredData = filteredData.filter(function () {
    count++;
    if (count <= MAX_PINS_FILTER) {
      return true;
    }
    return false;
  });
  window.pinrender.drowPins(filteredData);
};


housingType.addEventListener('change', function () {
  housingTypeFilter = housingType.value;
  updatePins();
});

housingPrice.addEventListener('change', function () {
  updatePins();
});

housingRooms.addEventListener('change', function () {
  updatePins();
});
housingGuests.addEventListener('change', function () {
  updatePins();
});

housingFeatures.addEventListener('change', function () {
  updatePins();
});
