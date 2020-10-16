"use strict";
const title = document.getElementById('title');
const price = document.getElementById('price');
const type = document.getElementById('type');
const timein = document.getElementById('timein');
const timeout = document.getElementById('timeout');
const roomNumber = document.getElementById('room_number');
const capacity = document.getElementById('capacity');

roomNumber.addEventListener('change', function () {
  checkRoomNumber();
});
capacity.addEventListener('change', function () {
  checkRoomNumber();
});
let checkRoomNumber = function () {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('1 комната для 1 гостя!');
  } else {
    if (roomNumber.value === '2' && capacity.value !== '1' && capacity.value !== '2') {
      capacity.setCustomValidity('2 комнаты — для 2 гостей или для 1 гостя!');
    } else {
      if (roomNumber.value === '3' && capacity.value !== '1' && capacity.value !== '2'
        && capacity.value !== '3') {
        capacity.setCustomValidity('для 3 гостей или для 2 гостей или для 1 гостя!');
      } else {
        if (roomNumber.value === '100' && capacity.value !== '0') {
          capacity.setCustomValidity('не для гостей!');
        } else {
          capacity.setCustomValidity('');
        }
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

title.addEventListener('invalid', function () {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    if (title.validity.tooLong || title.validity.tooShort) {
      title.setCustomValidity('Длина символов должна быть от 30 до 100!');
    } else {
      title.setCustomValidity('');
    }
  }
});

price.addEventListener('invalid', function () {
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
});

type.addEventListener('change', function () {
  setPrice();
});
let setPrice = function () {
  if (price.value === ``) {
    price.value = price.placeholder;
  }
  switch (type.value) {
    case "bungalow": price.min = 0; price.placeholder = price.min; break;
    case "flat": price.min = 1000; price.placeholder = price.min; break;
    case "house": price.min = 5000; price.placeholder = price.min; break;
    case "palace": price.min = 10000; price.placeholder = price.min; break;
  }
};

(function () {
  timein.selectedIndex = timeout.selectedIndex;
  setPrice();
  checkRoomNumber();
})();

