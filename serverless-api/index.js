// index.js
'use strict'

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const AWS = require('aws-sdk');

const BUCKET_NAME = process.env.BUCKET_NAME;
console.log('BUCKET_NAME is ', BUCKET_NAME);

const IS_OFFLINE = process.env.IS_OFFLINE;
let s3;
if (IS_OFFLINE === 'true') {
  s3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:8000'),
  });
} else {
  s3 = new AWS.S3();
};

const crypto = require('crypto');

function md5hex(str /*: string */) {
  const md5 = crypto.createHash('md5');
  return md5.update(str, 'binary').digest('hex');
}

// https://qiita.com/PianoScoreJP/items/3fbcebc43ebf821074d8
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json({ limit:'50mb' }));

console.log('Loading function');

const ping = require('./src/ping');
app.use('/ping', ping);

app.get('/', function (req, res) {
  console.log('Received: ', req);
  res.send('Hello World!');
});

app.post('/camera', function(req, res){
  console.log('Received: POST /camera');
  let img = new Buffer(req.body.img, 'base64');
  console.log('trying to putfile to S3');
  let key = new Date().toISOString().split('T')[0].replace(/-/g, '/') + '/' + md5hex(req.body.img) + '.png';
  putfile(img, key).then((data) => {
    console.log(data, key);
    res.json({key: key});
  }).catch((err) => {
    console.log(err);
  });
});

const putfile = async (buffer, key) => {
  let params = {
    Bucket: BUCKET_NAME,
    Key: 'images/' + key,
    ACL: 'public-read',
    Body: buffer
  };
  return await s3.putObject(params).promise();
}

module.exports.handler = serverless(app);
