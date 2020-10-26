'use strict';
(function () {
  const GET_CARDS_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;

  window.backend = {
    load: function (onSuccess, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          if (onError) {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
        }
      });
      if (onError) {
        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
      }
      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('GET', GET_CARDS_URL);
      xhr.send();
    }
  };
})();
