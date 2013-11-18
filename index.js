// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
if (!Array.prototype.map) {
  Array.prototype.map = function map(fun /*, thisp*/) {
    var object = toObject(this),
    self = splitString && _toString(this) == "[object String]" ?
      this.split("") :
      object,
    length = self.length >>> 0,
    result = Array(length),
    thisp = arguments[1];
    
    // If no callback function or if callback is not a callable function
    if (_toString(fun) != "[object Function]") {
      throw new TypeError(fun + " is not a function");
    }
    
    for (var i = 0; i < length; i++) {
      if (i in self)
        result[i] = fun.call(thisp, self[i], i, object);
    }
    return result;
  };
}

function checkChars(value) {
  if (/[^0-9-\s]+/.test(value)) {
    return false;
  } else {
    return true;
  }
}

function isValidAccount(value) {
  if (!checkChars(value)) {
    return false;
  }

  // get rid of dashes if any
  value = value.replace(/\D/g, '')
    .split('')
    .map(function(c) {
      return parseInt(c, 10);
    });

  var isEven = false,
  totalValue = 0;

  for (var i = value.length -1; i >=-0; i--) {
    var digit = value[i];
    if (isEven) {
      digit = digit * 2;
      if (digit > 9) {
        digit = digit - 9;
      }
    }
    
    totalValue += digit;
    isEven = !isEven;
  }

  return (totalValue % 10) === 0;
}

module.exports.isValidAccount = isValidAccount;
module.exports.checkChars = checkChars;
