/* Server initialization */
var request = require('request');
var SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM5', {
  baudRate: 9600
});
const parser = new Readline();

port.pipe(parser);

/* Vars for change comparison */
var s1Reading;
var s2Reading;

port.on('open', function(){
  console.log('Serial Port Opend');
  parser.on('data', function(data){
	  
	  var productID = data[7];
	  var sensorReading = data.substring(19);
	  console.log("Sensor: " + productID + ' Inches: ' + sensorReading);
	  
	  if(productID == 1)
	  {
		  if(s1Reading == undefined)
		  {
			  console.log("Sensor 1 Undefined, initializing");
			  s1Reading = sensorReading;
			  postSensor(productID, s1Reading);
		  }
		  else if(s1Reading != sensorReading)
		  {
			  s1Reading = sensorReading;
			  postSensor(productID, s1Reading);
		  }
	  }
	  
	  if(productID == 2)
	  {
		  if(s2Reading == undefined)
		  {
			  console.log("Sensor 1 Undefined, initializing");
			  s2Reading = sensorReading;
			  postSensor(productID, s1Reading);
		  }
		  else if(s2Reading != sensorReading)
		  {
			  s2Reading = sensorReading;
			  postSensor(productID, s1Reading);
		  }
	  }

	  
	  

  });
});

function postSensor(itemId, sensorReading){
	console.log("Change request"); /*
	var headers = {
		'User-Agent':       'Super Agent/0.0.1',
		'Content-Type':     'application/json'
	}

	// Configure the request
	var options = {
		url: 'http://ec2-13-59-35-127.us-east-2.compute.amazonaws.com:3000/sensor',
		method: 'POST',
		headers: headers,
		form: {
			'itemId': itemId,
			'sensorReading': sensorReading
		}
	}

	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
		}
	}) */
}
 
 /*
function initializeArray(sReading, itemId){
	
} */

	  /*
	  //sensor 1 array
	  if(productID == 1)
	  {
			if(s1Readings.length != 5)
			{
				s1Readings[0] = sensorReading;
				s1Readings[1] = sensorReading;
				s1Readings[2] = sensorReading;
				s1Readings[3] = sensorReading;
				s1Readings[4] = sensorReading;
			}
	  }
	  if(productID == 2)
	  {		
			if(s2Readings.length != 5)
			{
				s2Readings[0] = sensorReading;
				s2Readings[1] = sensorReading;
				s2Readings[2] = sensorReading;
				s2Readings[3] = sensorReading;
				s2Readings[4] = sensorReading;
			} 
		  
	  } */