"use strict";
(function () {
  const btnPin = document.querySelector(`.map__pin.map__pin--main`);
  const adFormElements = document.querySelectorAll('.ad-form__element');
  const mapFilters = document.querySelectorAll('.map__filter');
  const mapFeatures = document.querySelector('.map__features').querySelectorAll('input');
  const formReset = document.querySelector('.ad-form__reset');
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
  const fieldsets = document.querySelectorAll(`fieldset`);
  const PIN_LOCATION = {
    Xmin: 0,
    Xmax: document.body.offsetWidth,
    Ymin: 130,
    Ymax: 630
  };
  const PIN_INITIAL_POSITION =
  {
    X0: btnPin.style.left,
    Y0: btnPin.style.top
  };
  const SECONDARY_PIN_SIZE = {
    Width: 40,
    Height: 40
  };

  let housingTypeFilter = "any";
  const MAX_PINS_FILTER = 5;
  btnPin.onmousedown = function (event) {
    const shiftX = event.clientX - btnPin.getBoundingClientRect().left + pinDecrease;
    const shiftY = event.clientY - btnPin.getBoundingClientRect().top;
    function moveAt(pageX, pageY) {
      let pinX = pageX - shiftX + pinWidth / 2;
      let pinY = pageY - shiftY + pinHeight;
      if (pinX <= PIN_LOCATION.Xmax && pinX >= PIN_LOCATION.Xmin) {
        btnPin.style.left = pageX - shiftX + `px`;
      }
      if (pinY <= PIN_LOCATION.Ymax && pinY >= PIN_LOCATION.Ymin) {
        btnPin.style.top = pageY - shiftY + `px`;
      }
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
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    }
  };

  let setFormMode = function (isdisabled) {
    for (let index = 0; index < adFormElements.length; index++) {
      adFormElements[index].disabled = isdisabled;
    }
    for (let index = 0; index < mapFilters.length; index++) {
      mapFilters[index].disabled = isdisabled;
    }


  };

  let setAddress = function () {
    address.value = `${Math.round(parseInt(btnPin.style.left, 10) + pinWidth / 2)}, ${Math.round(parseInt(btnPin.style.top, 10) + pinHeight)}`;

  };
  const successHandler = function (data) {
    mapPinsDOM = data;
  };
  window.backend.load(successHandler, window.util.errorHandler);

  function disable() {
    resetFilters();
    formIsActive = false;
    document.querySelector(`.map`).classList.add(`map--faded`);
    document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
    setFormMode(true);
    window.pinRender.clear();
    btnPin.style.left = PIN_INITIAL_POSITION.X0;
    btnPin.style.top = PIN_INITIAL_POSITION.Y0;
    setAddress();
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    for (let index = 0; index < mapFeatures.length; index++) {
      if (mapFeatures[index].checked === true) {
        mapFeatures[index].checked = false;
      }
    }
    housingTypeFilter = "any";
  }
  let resetFilters = function () {
    for (let index = 0; index < mapFilters.length; index++) {
      mapFilters[index].selectedIndex = 0;
    }

  };

  window.map = {
    disableForm: disable
  };

  const updatePins = function () {
    window.pinRender.clear();
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
    for (let index = 0; index < filteredData.length; index++) {
      if (filteredData[index].location.x + SECONDARY_PIN_SIZE.Width / 2 > PIN_LOCATION.Xmax) {
        filteredData[index].location.x = PIN_LOCATION.Xmax - SECONDARY_PIN_SIZE.Width / 2;
      }
      if (filteredData[index].location.x + SECONDARY_PIN_SIZE.Width / 2 < PIN_LOCATION.Xmin) {
        filteredData[index].location.x = PIN_LOCATION.Xmin - SECONDARY_PIN_SIZE.Width / 2;
      }
      if (filteredData[index].location.y + SECONDARY_PIN_SIZE.Height < PIN_LOCATION.Ymin) {
        filteredData[index].location.y = PIN_LOCATION.Ymin - SECONDARY_PIN_SIZE.Height;
      }
      if (filteredData[index].location.y + SECONDARY_PIN_SIZE.Height > PIN_LOCATION.Ymax) {
        filteredData[index].location.y = PIN_LOCATION.Ymax - SECONDARY_PIN_SIZE.Height;
      }
    }
    window.pinRender.drowPins(filteredData);
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
  formReset.addEventListener('click', function (evt) {
    disable();
    evt.preventDefault();
  });
})();
