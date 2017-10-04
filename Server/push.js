var apn = require('apn');
var deviceToken = "17f66edd2294c454ba6a9847b133264b9e2a61cba78992b8181de1f8a895b572";

module.exports = function sendPush(token) {

  	console.log('push sent with token: '+token);
    var options = {
      cert: '../App/simpleliving/SimpLivinCert.pem',
      key:  '../App/simpleliving/SimpLivinKey.pem',
      passphrase: 'Ch1cken$',
      production: false,
      rejectUnauthorized:false
    };
    var apnProvider = new apn.Provider(options);
    if (token != undefined)
      deviceToken = token;
    
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "The post has been delivered";
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "io.ionic.simpleliving";
    
    apnProvider.send(note, deviceToken).then( (result) => {
      console.log(JSON.stringify(result));
    });
  }
