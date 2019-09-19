//const requestPromiseWrapper = require('./request-promise-wrapper');
const requestPromiseWrapper = require('./request-promise-wrapper-cb');

module.exports = async (timer) => {
  //console.log('async')
  const { body, httpResponse } = await requestPromiseWrapper({
    url: `http://localhost:3002/timer/${timer}`,
    method: 'GET'
  });
  if (!body || httpResponse.statusCode !== 200) {
    throw httpResponse.statusCode;
  }
  return body;
}