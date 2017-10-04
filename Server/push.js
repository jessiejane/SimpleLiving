var apn = require('apn');
module.exports = function sendPush(token, smartStock) {

  	console.log('push sent with token: '+token);
    var options = {
      cert: '../App/simpleliving/SimpLivinCert.pem',
      key:  '../App/simpleliving/SimpLivinKey.pem',
      passphrase: 'Ch1cken$',
      production: false,
      rejectUnauthorized:false
    };
    var apnProvider = new apn.Provider(options);
    
    
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "The post has been delivered";
    note.payload = {'messageFrom': 'John Appleseed'};
    if (smartStock == true) 
      note.payload = {'messageFrom': 'smartStock'};
    note.topic = "io.ionic.simpleliving";
    apnProvider.send(note, token).then( (result) => {
      console.log(JSON.stringify(result));
    });
  }
