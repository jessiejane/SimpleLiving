var apn = require('apn');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static'));
app.listen(3000);