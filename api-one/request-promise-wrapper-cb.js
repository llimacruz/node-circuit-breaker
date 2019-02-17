const request = require('request');

var falhas = 0;
var cb = 0;
var sucessos = 0;

module.exports = options => new Promise((resolve, reject) => {
  console.log('falhas', falhas)
  console.log('cb', cb)
  console.log('sucessos', sucessos)

  if (cb === 10) {
    console.log('cb = 10')
    cb = 0;
    falhas = 2;
  }

  if (falhas === 3) {
    cb++;
    return reject({ 'error' : 'cb' });
  }
  options.timeout = 1000;
  request(options, (err, httpResponse, body) => {
    if (err) {
      falhas++;
      sucessos = 0;
      console.log('falhas++', falhas)
      reject(err);
      return;
    }
    sucessos++;
    falhas = 0;
    cb = 0;
    resolve({
      httpResponse,
      body
    });
  });
});