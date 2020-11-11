const path = require("path");

module.exports = {
  entry:
    [
      "./js/util.js",
      "./js/backend.js",
      "./js/card.js",
      "./js/cardDetail.js",
      "./js/pinRender.js",
      "./js/debounce.js",
      "./js/filters.js",
      "./js/map.js",
      "./js/main.js"
    ],
  output: {
    filename: "bandle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
