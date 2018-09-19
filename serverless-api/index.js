// index.js

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

console.log('Loading function');

app.get('/', function (req, res) {
  console.log('Received: ', req);
  if(typeof req.params.img == 'undefined') {
    console.log('parameter img is not defined.');
  } else {
    console.log('req.params.img exists');
    let img = new Buffer(data, 'base64');
    console.log('trying to putfile to S3');
    await putfile(img);
  }
  res.send('Hello World!');
});

const putfile = async (buffer) => {
  let params = {
    Bucket: 'arschoolcamera',
    Key: 'images/' + Date.now().toString() + '.png',
    Body: buffer
  };
  return await s3.putObject(params).promise();
}

module.exports.handler = serverless(app);
