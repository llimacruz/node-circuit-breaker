const request = require('request');

module.exports = options => new Promise((resolve, reject) => {
  //options.timeout = 5000;
  request(options, (err, httpResponse, body) => {
    if (err) {
      reject(err);
      return;
    }
    resolve({
      httpResponse,
      body
    });
  });
});