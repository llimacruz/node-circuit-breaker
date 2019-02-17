const bodyParser = require('body-parser');
const express = require('express');

const app = express();

var countGet = 0

app.get('/', (req, res) => {
  console.log('get /', ++countGet);
  res.send('olá')
  console.log('get / finished', countGet);
})

app.get('/timer/:timer', (req, res) => {
  const timer = req.params['timer'];
  console.log('timer ' + timer);
  timeout(timer)
  /*
  .then(() => {
    console.log('primeiro promise ok')
    return timeout(timer-1000);
  })*/
  .then(() => {
    console.log('promise ok')
    res.send('timer ' + timer);
  })
  .catch(() => {
    console.log('catch')
    res.sendStatus(500);
  })
});

app.listen(3002, () => {
  console.log('api-two up at 3002 port');
})

const timeout = t => {
  return new Promise((resolve, reject) => {
    if (t === '1234') {
      console.log('reject')
      return reject();
    } 
    setTimeout(() => resolve(), t);
  });
}