var test      = require('tape'),
    generator = require('creditcard-generator'),
    luhn      = require('../index.js');

test('checkChars method', function(t) {
  t.plan(3);
  var numeralDigits = luhn.checkChars('123456789'),
      chars         = luhn.checkChars('12345fuckit'),
      topRow        = luhn.checkChars('!@#$%^&*');
  
  t.assert(numeralDigits, 'Valid digits were passed in');
  t.notOk(chars, 'method returns false when alphabetical characters are passed in');
  t.notOk(topRow, 'method returns false when top row of special characters is inserted');
});

test('isValidAccount', function(t) {
  t.plan(4);

  var visa = generator.GenCC('VISA')[0],
      amex = generator.GenCC('Amex')[0],
      mc   = generator.GenCC('Mastercard')[0],
  invalid  = visa - 1;

  t.assert(luhn.isValidAccount(visa), 'accepts visa account numbers');
  t.assert(luhn.isValidAccount(amex), 'accepts american express account numbers');
  t.assert(luhn.isValidAccount(mc), 'accepts mastercard account numbers');
  t.notOk(luhn.isValidAccount(invalid.toString(), 'correctly rejects improper credit card numbers'));
});
