"use strict"
var mysql = require("mysql");
var request = require('request');
var push = require("./push.js");
var itemThreshold = 2;
var io = require('socket.io-client');

//START JHG
/*
var app1 = express();
var http = require('http').Server(app1);
var io = require('socket.io')(http);

app1.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log('a user connected');
  //emit 'change-count' whenever changing value of count
});

http.listen(3002, function(){
   console.log('listening in http://localhost:' + 3002);
});
*/

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}


function calculateItemQty(sensorReading) {
    var itemSize = 3;
    var emptySize = 20;
    var distance = emptySize - sensorReading;
    var count = Number(distance / itemSize);
    if (count < 0) {
        count = 0;
    }

    return Math.round(count);
}

function getTransactionGroupId(connection) {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT MAX(TransactionGroupId) AS TransactionGroupId FROM transaction", function(err, rows) {
            if (err) {
                reject();
            } else {
                if (rows[0] !== null) {
                    var trnGrpId = parseInt(rows[0].TransactionGroupId) + 1;
                    resolve(trnGrpId);
                } else {
                    resolve("1");
                }
            }
        });
    });
}

function insertTransaction(req, connection, amount, userId) {
    var fromCustomerId = req.body.fromUser;
    var description = req.body.description;
    var type = req.body.type;
    var venmoId;
    var houseId;
    var masterToken;

    getTransactionGroupId(connection).then(function(data) {
        var trnGrpId = data;
        var query = "SELECT VenmoId,HouseId,MasterVenmoToken FROM ?? WHERE ?? = ?";
        var params = ["user", "userId", userId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                console.log(JSON.stringify({ "Error": true, "Message": "Error executing MySQL query: " + err }));
            } else {


                // update transaction
                if (rows[0] !== null) {
                    venmoId = rows[0].VenmoId;
                    houseId = rows[0].HouseId;
                    masterToken = rows[0].MasterVenmoToken;
                }

                // send venmo request
                console.log("############## " + venmoId + " #################")
                var jsonBody = JSON.stringify({
                    "access_token": masterToken,
                    "username": venmoId,
                    "note": description,
                    "amount": "-" + amount,
                    "audience": "private"
                })
                var headers = {
                    'Content-Type': 'application/json'
                }
                var options = {
                    url: 'https://api.venmo.com/v1/payments',
                    method: 'POST',
                    headers: headers,
                    body: jsonBody
                }

                // Start the request
                request(options, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log("succeess");
                    } else {
                        console.log('Venmo service failed: ' + error);
                    }
                });
            }



            var query = "INSERT INTO transaction (HouseId,Date,Amount,RecipientToId,RecipientFromId,TransactionGroupId,ImageUrl,Description,Type) VALUES (?,?,?,?,?,?,?,?,?)";
            var params = [houseId, new Date(), parseFloat(amount), parseInt(userId), parseInt(fromCustomerId), parseInt(trnGrpId), null, description, type];
            query = mysql.format(query, params);

            console.log("User " + userId + " " + amount);

            connection.query(query, function(err, rows) {
                if (err) {
                    console.log(JSON.stringify({ "Error": true, "Message": "Error executing MySQL query: " + err }));
                } else {
                    console.log(JSON.stringify({ "Error": false, "Message": "Success", "List": rows }));
                }
            });

        });
    });
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
    var self = this;

    router.get("/", function(req, res) {
        res.json({ "Message": "Hello World !" });
    });

    //#region User Crud Operation 
    router.get("/user", function(req, res) {
        var query = "SELECT * FROM ??";
        var params = ["User"];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.get("/user/:UserId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["User", "UserId", req.params.UserId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.post("/user", function(req, res) {
        var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var params = ["User", "HouseId", "Name", "VenmoId", "DeviceId", "ImageUrl", "DeviceToken", req.body.HouseId, req.body.Name,
            req.body.VenmoId, req.body.DeviceId, req.body.ImageUrl, req.body.DeviceToken
        ];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House Added!", "User": rows });
            }
        });
    });

    router.patch("/user/:UserId", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var params = ["User", "HouseId", req.body.HouseId, "Name", req.body.Name, "VenmoId", req.body.VenmoId, "DeviceId", req.body.DeviceId,
            "ImageUrl", req.body.ImageUrl, "DeviceToken", reqb.body.DeviceToken, "ItemId", req.params.UserId
        ];

        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "User with id " + req.params.UserId + " was updated", "User": rows });
            }
        });
    });

    router.delete("/user/:UserId", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["User", "UserId", req.params.UserId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the user with id " + req.params.UserId });
            }
        });
    });
    //#endregion User Crud Operation 

    //#region House Crud Operation
    router.get("/house", function(req, res) {
        var query = "SELECT * FROM ??";
        var params = ["House"];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "House": rows });
            }
        });
    });

    router.get("/house/:HouseId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["House", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "House": rows });
            }
        });
    });

    router.get("/house/:HouseId/lists", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["List", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.get("/house/:HouseId/users", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["User", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.post("/house", function(req, res) {
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var params = ["House", "Name", "Address", "BulletinInfo", req.body.Name, req.body.Address, req.body.BulletinInfo];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House Added!", "House": rows });
            }
        });
    });

    router.patch("/house/:HouseId", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?";
        var table = ["House", "Name", req.body.Name, "Address", req.body.Address, "BulletinInfo", req.body.BulletinInfo, "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House with id " + req.params.HouseId + " was updated", "House": rows });
            }
        });
    });

    router.delete("/house/:HouseId", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["House", "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the house with id " + req.params.HouseId });
            }
        });
    });

    router.delete("/house/:HouseId/users", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["User", "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted all users with HouseId " + req.params.HouseId });
            }
        });
    });
    //#endregion House Crud Operation

    //#region List Crud Operation
    router.get("/lists", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? != ?";
        var params = ["List", "ListId", "3"];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.get("/lists/:ListId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["List", "ListId", req.params.ListId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.get("/lists/:ListId/items", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["Item", "ListId", req.params.ListId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });

    router.post("/lists", function(req, res) {
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var params = ["List", "HouseId", "Name", req.body.HouseId, req.body.Name];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "List Added!", "List": rows });
            }
        });
    });

    router.patch("/lists/:ListId", function(req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["List", "Name", req.body.Name, "HouseId", req.body.HouseId, "ListId", req.param.ListId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "List with id " + req.params.ListId + " was updated", "List": rows });
            }
        });
    });

    router.delete("/lists/:ListId/", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["List", "ListId", req.params.ListId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the list with id " + req.params.ListId });
            }
        });
    });

    router.delete("/lists/:ListId/items/", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["Item", "ListId", req.params.ListId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the list with id " + req.params.ListId });
            }
        });
    });
    //#endregion List Crud Operation

    //#region Item Crud Operation
    router.get("/items", function(req, res) {
        var query = "SELECT * FROM ??";
        var params = ["Item"];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });



    router.get("/items/:ItemId", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["Item", "ItemId", req.params.ItemId];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });

    router.get("/transactions/:HouseId", function(req, res) {
        var query = "SELECT DATE_FORMAT(A.Date, '%m/%d/%y') as newDate, A.amount, B.name as fromName, C.name as toName, A.description " +
            "FROM Transaction as A join User as B on A.recipientFromId = B.UserID join User as C on A.recipientToId = C.UserId  " +
            "Where A.houseid = 1 order by A.transactionGroupId";

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });

    router.post("/items", function(req, res) {
        var itemCount = calculateItemQty(req.body.SensorReading);
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
        var params = ["Item", "HouseId", "Name", "IsSmartStock", "ListId", "Description", "AmazonProductUrl", "SensorReading", "Quantity",
            req.body.HouseId, req.body.Name, req.body.IsSmartStock, req.body.ListId, req.body.Description, req.body.AmazonProductUrl,
            req.body.SensorReading, itemCount
        ];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Item Added!", "Item": rows });
            }
        });
    });

    router.patch("/items/:ItemId", function(req, res) {
        console.log("posting to item: " + JSON.stringify(req.body.item))
        if (req.body.item == undefined) {
            var itemCount = calculateItemQty(req.body.SensorReading)

            if (itemCount <= itemThreshold) {
                console.log('Item too low');
                res.json({ "Error": true, "Message": "Item too low" });
                // add notification code here    
            }
        } else {
            itemCount = req.body.item.Quantity;
            req.body = req.body.item;

        }
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var params = ["Item", "Quantity", itemCount, "ItemId", req.params.ItemId];

        query = mysql.format(query, params);
        console.log(query);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.delete("/items/:ItemId/", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["Item", "ItemId", req.params.ItemId];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the item with id " + req.params.ItemId });
            }
        });
    });
    //#endregion Item Crud Operation


    router.post("/sensorReading", function(req, res) {
        var itemId = req.body.itemId;
        var itemCount = calculateItemQty(req.body.sensorReading);

        if (itemCount <= itemThreshold) {
            console.log("Item too low");
            for (var i = 0; i < deviceTokens.length; i++) {
                push(deviceTokens[i], true);
            }
            // add notification code here
        }
        
        var socket = io.connect("http://localhost:3001/");
        socket.emit('change-smartstock-count', {count: itemCount, id: itemId});

        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var params = ["Item", "Quantity", parseInt(itemCount), "ItemId", parseInt(itemId)];
        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    var deviceTokens = [];

    router.get('/push', function(req, res) {
        for (var i = 0; i < deviceTokens.length; i++) {
            push(deviceTokens[i], true);
        }
        res.redirect('/index.html')
    });

    //device sends us its device token on app launch 
    //TODO: read device tokens from DB instead of deviceTokens var
    router.put('/token', function(req, res) {

        console.log("received device token: " + req.body.token);

        var index = deviceTokens.indexOf(req.body.token);

        if (index == -1) {
            deviceTokens.push(req.body.token)
        }
        console.log("device tokens: ", deviceTokens)
        var query = "INSERT INTO ?? (??) VALUES (?)";
        var params = ["Config", "DeviceToken", req.body.token];

        query = mysql.format(query, params);

        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Device Token " + req.body.token + " was added" });
            }
        });
    });


    router.post('/createTransaction', function(req, res) {
        var users = req.body.users;
        var response = "";
        var userId;
        var amount;

        for (var key in users) {
            response = response + users[key].userId + " " + users[key].amount;
            userId = users[key].userId;
            amount = users[key].amount;

            insertTransaction(req, connection, amount, userId);
        }

        res.json(response);
    });


    router.post('/imageAmount', function(req, res) {
        var imageData = req.body.imageData;
        var imageTxt = "";

        var jsonBody = JSON.stringify({
            "requests": [{
                "image": {
                    "content": imageData
                },
                "features": [{
                    "type": "TEXT_DETECTION"
                }]
            }]
        })

        // Configure the request
        var headers = {
            'Content-Type': 'application/json'
        }
        var options = {
            url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAmSI4iL4-rWLn24HJvIJdxwx4hyt0Kkuk',
            method: 'POST',
            headers: headers,
            body: jsonBody
        }

        // Start the request
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log('Image recognition service succeeded.');

                var obj = JSON.parse(body);
                imageTxt = (obj.responses[0].textAnnotations[0].description);


                var regex = new RegExp('(Total)(\\w|\\s|\\-|\\.|\\,)*(\\$)\\d+\\.\\d{2}', 'i')
                var regex2 = new RegExp('(\\$)\\d+\\.\\d{2}', 'i')
                var regex3 = new RegExp('\\d+\\.\\d{2}', 'i')
                //console.log('Image Text: ' + imageTxt);
                var amountVal = -1;
                var r = imageTxt.match(regex)
                for (var key in r) {
                    var s = r[0].match(regex2)

                    for (var key1 in s) {
                        var t = s[0].match(regex3)
                        for (var key2 in t) {
                            amountVal = t[0];
                        }
                    }
                }

                res.json({ "amount": amountVal });


            } else {
                console.log('Image recognition service failed: ' + error);
            }
        })

    });

}

module.exports = REST_ROUTER;