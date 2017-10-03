var apn = require('apn');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.listen(3000, function (){
	console.log('Simpl running on port 3000!')
});

app.post('/sensorReading', function(req, res) {
		var itemId = req.body.itemId;
		var sensorReading = req.body.sensorReading;
		res.json({ message: 'Got a post /sensorReading request.' + itemId + ' ' + sensorReading});
	}
);
