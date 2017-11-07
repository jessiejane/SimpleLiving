var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./rest.js");
var app  = express();
app.use(express.static(__dirname + '/static'));
app.get('/push', function(req,res) {
 sendPush(deviceToken);
 res.redirect('/index.html')
});
app.get('/pushSmart', function(req,res) {
 sendPush(deviceToken, true);
 res.redirect('/index.html')
});
app.get('/push', function(req,res) {
var deviceToken="d1be75f7142cef5e57ed94e1b76556e60e00c066843044f274cdd435f19437b0";
 sendPush(deviceToken);
 res.redirect('/index.html')
});
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header(
    'Access-Control-Allow-Headers', 
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Methods'
  );
  if ('OPTIONS' === req.method) {
    res.status(200).end();
  } else {
    next();
  }
});

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'user',
        password : 'user',
        database : 'SimpleLiving',
        debug    :  true
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
      app.use(bodyParser.json({limit: '50mb'}));
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();