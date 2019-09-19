const express = require('express');

const app = express();

app.get('/timer/:timer', (req, res) => {
  const timer = req.params['timer'];
  timeout(timer)
  .then(() => {
    console.log('successfull - timer ' + timer, new Date());
    res.send('timer ' + timer);
  })
  .catch(() => {
    console.log('error get, timer ', timer)
    res.sendStatus(500);
  })
});

app.listen(3002, () => {
  console.log('api-two up at 3002 port');
})

const timeout = t => {
  return new Promise((resolve, reject) => {
    if (t === '1234') {
      setTimeout(() => reject(), t);
    } else {
      setTimeout(() => resolve(), t);
    }
  });
}