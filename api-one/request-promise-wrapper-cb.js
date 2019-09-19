const request = require('request');

var countFalhas = 0;
var countCircuitBreakerOpen = 0;

module.exports = options => new Promise((resolve, reject) => {
  /*console.log('falhas', falhas)
  console.log('cb', cb)
  console.log('sucessos', sucessos)*/

  if (countCircuitBreakerOpen === 10) {
    console.log('cb = 10 - zerando contador - circuit breaker fechado')
    countCircuitBreakerOpen = 0;
    countFalhas--;
  }

  if (countFalhas === 3) {
    countCircuitBreakerOpen++;
    return reject({ 'error' : 'circuit breaker aberto' });
  }
  //options.timeout = 500;
  request(options, (err, httpResponse, body) => {
    if (err || httpResponse.statusCode === 500) {
      countFalhas++;
      console.log('falhas++', countFalhas)
      reject(err);
      return;
    }
    countFalhas = 0;
    countCircuitBreakerOpen = 0;
    resolve({
      httpResponse,
      body
    });
  });
});