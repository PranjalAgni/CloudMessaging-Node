const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require('./config/database');
const fdb = require('./services/fbase');
const webpush = require('web-push');


//Basic Middileware init
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "view")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


//Setting webpush
const publicVapidKey = 'BF0XbUuuf1coR3-uy6SyXlpTTJ-Kk30q3b7m9D9MDTWObEj04KI2pwgrqPURG2WguD9IAfY9zhSmr5vYrBlVhuc';

const privateVapidKey = '2cRXTperNa0RH6Iwf0Ln6fViXPzacRGEV3RcjCvqOJ4';

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  publicVapidKey,
  privateVapidKey
);

app.post('/subscribe', function (req , res) {

  console.log('request hit');
  const subscription = req.body;
  console.log(subscription);

  res.status(201).json({});

  //Create Payload
  const payload = JSON.stringify({title: 'Push test'});

  //send notification
  webpush.sendNotification(subscription,payload).catch(function (reason) {
    console.error(reason);
  });

});

app.listen(5000 , function () {
  console.log('Server started on port ', 5000);
});
