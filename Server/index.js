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
		var itemSize = 5;
		var emptySize = 50;
		var itemThreshold = 2;

		var distance = emptySize - sensorReading;
		var itemCount = distance / itemSize;

		if (itemCount <= itemThreshold)
		{
			console.log('Item too low');
			// add notification code here
		}

		// database call here
		
		res.json({ message: 'Got a post /sensorReading request.' + itemId + ' ' + sensorReading});
	}
);
