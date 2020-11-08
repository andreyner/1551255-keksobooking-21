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
      if (count <= MAX_PINS_FILTER) {
        return true;
      }
      return false;
    });

    filteredData = filteredData.slice().filter(function (x) {
      if (housingType.value !== "any") {
        if (x.offer !== undefined && x.offer.type === housingType.value) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
    filteredData = filteredData.slice().filter(function (x) {
      if (housingGuests.value !== "any") {
        if (x.offer !== undefined && x.offer.guests !== undefined) {
          switch (housingGuests.selectedIndex) {
            case 1: if (x.offer.guests >= 2) {
              return true;
            } else {
              return false;
            }
            case 2: if (x.offer.guests >= 1) {
              return true;
            } else {
              return false;
            }
            case 3: if (x.offer.guests === 0) {
              return true;
            } else {
              return false;
            }
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
      if (housingRooms.value !== "any") {
        if (x.offer !== undefined && x.offer.rooms !== undefined) {
          switch (housingRooms.selectedIndex) {
            case 1: if (x.offer.rooms === 1) {
              return true;
            } else {
              return false;
            }
            case 2: if (x.offer.rooms === 2) {
              return true;
            } else {
              return false;
            }
            case 3: if (x.offer.rooms === 3) {
              return true;
            } else {
              return false;
            }
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
      if (housingPrice.value !== "any") {
        if (x.offer !== undefined && x.offer.price !== undefined) {
          switch (housingPrice.selectedIndex) {
            case 1: if (x.offer.price >= 10000 && x.offer.price < 50000) {
              return true;
            } else {
              return false;
            }
            case 2: if (x.offer.price < 10000) {
              return true;
            } else {
              return false;
            }
            case 3: if (x.offer.price >= 50000) {
              return true;
            } else {
              return false;
            }
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
