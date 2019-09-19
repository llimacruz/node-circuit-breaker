const express = require('express');
const bodyParser = require('body-parser');
const getTwoTimer = require('./client-two');

const app = express();
app.use(bodyParser.json({
  type: '*/*',
  limit: '100mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

var countGet = 0

app.get('/', (req, res) => {
  console.log('get /', ++countGet);
  res.send('olá')
  console.log('get / finished', countGet);
})

app.post('/', async (req, res) => {
  //console.log('post /');
  try {
    timer = req.body.timer;
    //console.log('timer', timer, new Date())
    await getTwoTimer(timer);
    console.log('post ok on api-two')
    res.sendStatus(200);
  } catch (error) {
    console.log(new Date(), 'error post', JSON.stringify(error) || res.statusCode)
    res.sendStatus(500);
  }
});

app.listen(3001, () => {
  console.log('api-one up at 3001 port');
})
