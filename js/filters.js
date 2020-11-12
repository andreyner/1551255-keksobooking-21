"use strict";
(function () {
  const housingType = document.getElementById('housing-type');
  const housingPrice = document.getElementById('housing-price');
  const housingRooms = document.getElementById('housing-rooms');
  const housingGuests = document.getElementById('housing-guests');
  const housingFeatures = document.getElementById('housing-features');
  const housingFeaturesAll = housingFeatures.querySelectorAll('input');
  const MAX_PINS_FILTER = 5;
  let initialData = [];
  const GUEST_TO_INDEX_MAP =
  {
    "any": 0,
    "twoGuest": 1,
    "oneGuest": 2,
    "notForGuest": 3
  };
  const ROOM_TO_INDEX_MAP =
  {
    "any": 0,
    "oneRoom": 1,
    "twoRoom": 2,
    "threeRoom": 3,
  };
  const APPARTMENT_PRICE_TO_INDEX_MAP =
  {
    "any": 0,
    "from10000To50000": 1,
    "to10000": 2,
    "from50000": 3
  };
  let updatePinsCB = function () {

  };
  housingType.addEventListener('change', function () {
    approveAllFilters();
  });

  housingPrice.addEventListener('change', function () {
    approveAllFilters();
  });

  housingRooms.addEventListener('change', function () {
    approveAllFilters();
  });
  housingGuests.addEventListener('change', function () {
    approveAllFilters();
  });

  housingFeatures.addEventListener('change', function () {
    approveAllFilters();
  });

  let approveAllFilters = function () {
    let count = 0;
    let filteredData = initialData.filter(function () {
      count++;
      return count <= MAX_PINS_FILTER;
    });

    filteredData = filteredData.slice().filter(function (x) {
      if (housingType.value !== "any") {
        return x.offer !== undefined && x.offer.type === housingType.value;
      } else {
        return true;
      }
    });
    filteredData = filteredData.slice().filter(function (x) {
      if (housingGuests.selectedIndex !== GUEST_TO_INDEX_MAP.any) {
        if (x.offer !== undefined && x.offer.guests !== undefined) {
          switch (housingGuests.selectedIndex) {
            case GUEST_TO_INDEX_MAP.twoGuest: return x.offer.guests >= 2;
            case GUEST_TO_INDEX_MAP.oneGuest: return x.offer.guests >= 1;
            case GUEST_TO_INDEX_MAP.notForGuest: return x.offer.guests === 0;
            default: return true;
          }
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
    filteredData = filteredData.slice().filter(function (x) {
      if (housingRooms.selectedIndex !== ROOM_TO_INDEX_MAP.any) {
        if (x.offer !== undefined && x.offer.rooms !== undefined) {
          switch (housingRooms.selectedIndex) {
            case ROOM_TO_INDEX_MAP.oneRoom: return x.offer.rooms === 1;
            case ROOM_TO_INDEX_MAP.twoRoom: return x.offer.rooms === 2;
            case ROOM_TO_INDEX_MAP.threeRoom: return x.offer.rooms === 3;
            default: return true;
          }
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
    filteredData = filteredData.slice().filter(function (x) {
      if (housingPrice.selectedIndex !== APPARTMENT_PRICE_TO_INDEX_MAP.any) {
        if (x.offer !== undefined && x.offer.price !== undefined) {
          switch (housingPrice.selectedIndex) {
            case APPARTMENT_PRICE_TO_INDEX_MAP.from10000To50000: return x.offer.price >= 10000 && x.offer.price < 50000;
            case APPARTMENT_PRICE_TO_INDEX_MAP.to10000: return x.offer.price < 10000;
            case APPARTMENT_PRICE_TO_INDEX_MAP.from50000: return x.offer.price >= 50000;
            default: return true;
          }
        } else {
          return false;
        }
      } else {
        return true;
      }
    });

    for (let index = 0; index < housingFeaturesAll.length; index++) {
      if (housingFeaturesAll[index].checked === true) {
        filteredData = filteredData.filter(function (x) {
          if (x.offer.features === undefined) {
            return false;
          } else {
            return x.offer.features.some((y) => y === housingFeaturesAll[index].value);
          }
        });
      }
    }
    (window.debounce(function () {
      updatePinsCB(filteredData);
    }))();
  };


  window.filters =
  {
    getFilteredData: function (mapPinsDOM, cb) {
      initialData = mapPinsDOM;
      updatePinsCB = cb;
      approveAllFilters();
    }

  };
})();
