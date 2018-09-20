// index.js

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// https://qiita.com/PianoScoreJP/items/3fbcebc43ebf821074d8
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json({ limit:'50mb' }));

console.log('Loading function');

app.get('/', function (req, res) {
  console.log('Received: ', req);
  res.send('Hello World!');
});

app.post('/camera', function(req, res){
  console.log('Received: POST /camera');
  let img = new Buffer(req.body.img, 'base64');
  console.log('trying to putfile to S3');
  putfile(img).then((data) => {
    console.log(data);
    res.send('file saved');
  }).catch((err) => {
    console.log(err);
  });
});

const putfile = async (buffer) => {
  let params = {
    Bucket: 'arschoolcamera',
    Key: 'images/' + Date.now().toString() + '.png',
    ACL: 'public-read',
    Body: buffer
  };
  return await s3.putObject(params).promise();
}

module.exports.handler = serverless(app);
