// index.js

const serverless = require('serverless-http');
const express = require('express')
const app = express()

console.log('Loading function');

app.get('/', function (req, res) {
  console.log('Received: ', req);
  res.send('Hello World!')
})

module.exports.handler = serverless(app);
