"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout = null,
      initialCall = true;
  return function () {
    var context = this,
        args = arguments,
        callNow = immediate && initialCall,
        fnc = function fnc() {
      fn.apply(context, args);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      fnc();
    }

    if (!timeout) {
      timeout = setTimeout(fnc, wait);
    }
  };
};

exports.default = _default;