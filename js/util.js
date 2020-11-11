"use strict";

window.util = {
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandomInRange: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  errorHandler: function (errorMessage) {
    let node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
};
