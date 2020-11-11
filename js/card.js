"use strict";
(function () {
  const title = document.getElementById('title');
  const price = document.getElementById('price');
  const typeOfHousing = document.getElementById('type');
  const timein = document.getElementById('timein');
  const timeout = document.getElementById('timeout');
  const roomNumber = document.getElementById('room_number');
  const capacity = document.getElementById('capacity');
  const guests = capacity.querySelectorAll('option');
  const adForm = document.querySelector('.ad-form');
  const description = document.getElementById('description');
  const avatar = document.querySelector('.ad-form-header__input');
  const flatPhoto = document.querySelector('.ad-form__input');
  const successWindowTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorWindowTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorButton = document.querySelector(`.error__button`);
  const main = document.querySelector('main');
  const features = document.querySelector('.features');
  const GUEST_TO_INDEX_MAP =
  {
    "oneGuest": 2,
    "twoGuest": 1,
    "threeGuest": 0,
    "notForGuest": 3
  };
  const ROOM_TO_INDEX_MAP =
  {
    "oneRoom": 0,
    "twoRoom": 1,
    "threeRoom": 2,
    "hundredRoom": 3
  };
  const TYPE_APPARTMENT_MIN_PRICE =
  {
    "bungalow": 0,
    "flat": 1000,
    "house": 5000,
    "palace": 10000

  };
  const TYPE_APPARTMENT_NAME =
  {
    "bungalow": "bungalow",
    "flat": "flat",
    "house": "house",
    "palace": "palace"
  };
  const CHECK_IN_TIME_TO_INDEX_MAP =
  {
    "after12": 0,
    "after13": 1,
    "after14": 2
  };
  const CHECK_OUT_TIME_TO_INDEX_MAP =
  {
    "before12": 0,
    "before13": 1,
    "before14": 2
  };
  roomNumber.addEventListener('change', function () {
    checkRoomNumber();
  });
  capacity.addEventListener('change', function () {
    checkRoomNumber();
  });
  let checkRoomNumber = function () {
    setAvalibleGuests(roomNumber.selectedIndex);
  };
  let setAvalibleGuests = function (selectedRoom) {
    for (let index = 0; index < guests.length; index++) {
      switch (selectedRoom) {
        case ROOM_TO_INDEX_MAP.oneRoom: if (index !== GUEST_TO_INDEX_MAP.oneGuest) {
          guests[index].disabled = true;
        } else {
          guests[index].disabled = false;
        } break;
        case ROOM_TO_INDEX_MAP.twoRoom: if (index !== GUEST_TO_INDEX_MAP.oneGuest && index !== GUEST_TO_INDEX_MAP.twoGuest) {
          guests[index].disabled = true;
        } else {
          guests[index].disabled = false;
        } break;
        case ROOM_TO_INDEX_MAP.threeRoom: if (index === GUEST_TO_INDEX_MAP.notForGuest) {
          guests[index].disabled = true;
        } else {
          guests[index].disabled = false;
        } break;
        case ROOM_TO_INDEX_MAP.hundredRoom: if (index !== GUEST_TO_INDEX_MAP.notForGuest) {
          guests[index].disabled = true;
        } else {
          guests[index].disabled = false;
        } break;
      }
    }
    if (guests[capacity.selectedIndex].disabled) {
      for (let index = 0; index < guests.length; index++) {
        if (!guests[index].disabled) {
          capacity.selectedIndex = index;
          break;
        }
      }
    }
  };

  timein.addEventListener('change', function () {
    timeout.selectedIndex = timein.selectedIndex;
  });
  timeout.addEventListener('change', function () {
    timein.selectedIndex = timeout.selectedIndex;
  });

  let checkTitle = function () {
    if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      if (title.validity.tooLong || title.validity.tooShort) {
        title.setCustomValidity('Длина символов должна быть от 30 до 100!');
      } else {
        title.setCustomValidity('');
      }
    }
  };
  let checkPrice = function () {
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      if (price.validity.typeMismatch) {
        price.setCustomValidity('Ввдено не число!');
      } else {
        if (price.validity.rangeOverflow) {
          price.setCustomValidity('Введено больше 1000000!');
        } else {
          price.setCustomValidity('');
        }
      }
    }
  };
  title.addEventListener('invalid', function () {
    checkTitle();
  });
  price.addEventListener('invalid', function () {
    checkPrice();
  });

  price.addEventListener('input', function () {
    checkPrice();
  });
  title.addEventListener('input', function () {
    checkTitle();
  });

  typeOfHousing.addEventListener('change', function () {
    setPrice();
  });
  let setPrice = function () {
    switch (typeOfHousing.value) {
      case TYPE_APPARTMENT_NAME.bungalow: price.min = TYPE_APPARTMENT_MIN_PRICE.bungalow; price.placeholder = price.min; break;
      case TYPE_APPARTMENT_NAME.flat: price.min = TYPE_APPARTMENT_MIN_PRICE.flat; price.placeholder = price.min; break;
      case TYPE_APPARTMENT_NAME.house: price.min = TYPE_APPARTMENT_MIN_PRICE.house; price.placeholder = price.min; break;
      case TYPE_APPARTMENT_NAME.palace: price.min = TYPE_APPARTMENT_MIN_PRICE.palace; price.placeholder = price.min; break;
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  let clearform = function () {
    title.value = "";
    price.value = TYPE_APPARTMENT_MIN_PRICE.flat;
    price.placeholder = price.value;
    typeOfHousing.value = TYPE_APPARTMENT_NAME.flat;

    timein.selectedIndex = CHECK_IN_TIME_TO_INDEX_MAP.after12;
    timeout.selectedIndex = CHECK_OUT_TIME_TO_INDEX_MAP.before12;

    roomNumber.selectedIndex = ROOM_TO_INDEX_MAP.oneRoom;
    capacity.selectedIndex = GUEST_TO_INDEX_MAP.oneGuest;
    setAvalibleGuests(roomNumber.selectedIndex);
    description.value = "";
    avatar.value = '';
    flatPhoto.value = '';
    for (let index = 0; index < features.children.length; index++) {
      if (features.children[index].checked === true) {
        features.children[index].checked = false;
      }
    }
    features.disabled = true;
  };

  let successHandler = function () {
    window.map.disableForm();
    clearform();
    let newWindow = successWindowTemplate.cloneNode(true);
    main.appendChild(newWindow);
    let onDocumentClick = function () {
      removeAllSuccessHandlers();
    };
    let onDocumentKeyDown = function (evt) {
      if (evt.key === 'Escape') {
        removeAllSuccessHandlers();
      }
    };
    let removeAllSuccessHandlers = function () {
      main.removeChild(newWindow);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  };
  let errorHandler = function () {
    window.map.disableForm();
    clearform();
    let newWindow = errorWindowTemplate.cloneNode(true);
    main.appendChild(newWindow);
    let closeErrorButtonClick = function (evt) {
      evt.preventDefault();
      removeAllErrorHandlers();
    };
    errorButton.addEventListener('click', closeErrorButtonClick);
    let onDocumentClick = function () {
      removeAllErrorHandlers();
    };
    let onDocumentKeyDown = function (evt) {
      if (evt.key === 'Escape') {
        removeAllErrorHandlers();
      }
    };
    let removeAllErrorHandlers = function () {
      main.removeChild(newWindow);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);

  };
  window.card =
  {
    clearCard: clearform
  };
  (function () {
    timein.selectedIndex = timeout.selectedIndex;
    setPrice();
    checkRoomNumber();
  })();

})();
