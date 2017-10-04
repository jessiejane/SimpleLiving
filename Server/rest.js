var mysql = require("mysql");
var request = require('request');
var push = require("./push.js");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
    var self = this;

    router.get("/", function (req, res) {
        res.json({ "Message": "Hello World !" });
    });
    
    router.get("/user", function (req, res) {
        var query = "SELECT * FROM ??";
        var params = ["User"];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.get("/user/:UserId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["User", "UserId", req.params.UserId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.get("/user/house/:HouseId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["User", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "User": rows });
            }
        });
    });

    router.post("/user", function (req, res) {
        var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var params = ["User", "HouseId", "Name", "VenmoId", "DeviceId", "ImageUrl", "DeviceToken", req.body.HouseId, req.body.Name, 
                    req.body.VenmoId, req.body.DeviceId, req.body.ImageUrl, req.body.DeviceToken];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House Added!", "User": rows });
            }
        });
    });

    router.delete("/user/:UserId/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["User", "UserId", req.params.UserId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the user with id " + req.params.UserId });
            }
        });
    });

    router.get("/house", function (req, res) {
        var query = "SELECT * FROM ??";
        var params = ["House"];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "House": rows });
            }
        });
    });

    router.get("/house/:HouseId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["House", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "House": rows });
            }
        });
    });

    router.post("/house", function (req, res) {
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var params = ["House", "HouseId", "Name", "Address", "BulletinInfo", req.body.HouseId, req.body.Name, req.body.Address, req.body.BulletinInfo];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House Added!", "House": rows });
            }
        });
    });

    router.delete("/house/:HouseId/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["House", "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the user with id " + req.params.UserId });
            }
        });
    });

    router.get("/lists", function (req, res) {
        var query = "SELECT * FROM ??";
        var params = ["List"];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.get("/lists/:ListId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["List", "ListId", req.params.ListId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.get("/lists/house/:HouseId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["List", "HouseId", req.params.HouseId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.post("/lists", function (req, res) {
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var params = ["List", "HouseId", "Name", req.body.HouseId, req.body.Name];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "List Added!", "List": rows });
            }
        });
    });

    router.delete("/lists/:ListId/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["List", "ListId", req.params.ListId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the list with id " + req.params.ListId });
            }
        });
    });

    router.get("/items", function (req, res) {
        var query = "SELECT * FROM ??";
        var params = ["Item"];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });

    router.get("/items/:ItemId", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["Item", "ItemId", req.params.ItemId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
            }
        });
    });

    router.post("/items", function (req, res) {
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var params = ["Item", "HouseId", "Name", "IsSmartStock", "ListId", "Description", "AmazonProductId", "SensorReading",
            req.body.HouseId, req.body.Name, req.body.IsSmartStock, req.body.ListId, req.body.Description, req.body.AmazonProductId, req.body.SensorReading];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Item Added!", "Item": rows });
            }
        });
    });

    router.patch("/items/sensorreading/:SensorReading/", function (req, res) {

        var sensorReading = req.body.SensorReading;
        var itemSize = 5;
        var emptySize = 50;
        var itemThreshold = 2;

        var distance = emptySize - sensorReading;
        var itemCount = distance / itemSize;

        if (itemCount <= itemThreshold) {
            console.log('Item too low');
            res.json({ "Error": true, "Message": "Item too low" });
            // add notification code here    
        }

        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var params = ["Item", "SensorReading", req.body.SensorReading, "ItemId", req.params.ItemId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    router.delete("/items/:ItemId/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["Item", "ItemId", req.params.ItemId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the item with id " + req.params.ItemId });
            }
        });
    });

    router.post("/sensorReading", function (req, res) {
        var itemId = req.body.itemId;
        var sensorReading = req.body.sensorReading;
        var itemSize = 5;
        var emptySize = 50;
        var itemThreshold = 2;

        var distance = emptySize - sensorReading;
        var itemCount = Math.round(Number(distance/itemSize)); 


        if (itemCount <= itemThreshold) {
            console.log("Item too low");
            push("4abe2ec0d7faeb4521630176365544760dcd073dec8c254bff2078d1b5d91ee9");
            push("a0847f09ae68fb5b5304c82bfdfe88069e8a9b32fe5830b0e6a7182292274d29");
            // add notification code here
        }

        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var params = ["Item", "Quantity", itemCount, "ItemId", parseInt(itemId)];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
            }
        });
    });

    var deviceToken = "4abe2ec0d7faeb4521630176365544760dcd073dec8c254bff2078d1b5d91ee9";
    router.post('/token', function (req, res) {
        deviceToken = req.body.token;
        console.log("received device token: " + req.body.token);
        var response = "Loud and Clear";
        res.json(response);
        push(req.body.token);
    });

    router.get('/push', function (req, res) {
        push(deviceToken);
        res.redirect('/index.html')
    });

    router.post('/imageAmount', function (req, res) {
        var imageUri = req.body.imageUri;
        var imageTxt = "";

        var jsonBody = JSON.stringify({
            "requests": [
                {
                    "image": {
                        "source": {
                            "imageUri": imageUri
                        }
                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION"
                        }
                    ]
                }
            ]
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
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log('Image recognition service succeeded.');

                var obj = JSON.parse(body);
                imageTxt = (obj.responses[0].textAnnotations[0].description);


                var regex = new RegExp('(Total)(\\w|\\s|\\-|\\.|\\,)*(\\$)\\d+\\.\\d{2}', 'i')
                var regex2 = new RegExp('(\\$)\\d+\\.\\d{2}', 'i')
                var regex3 = new RegExp('\\d+\\.\\d{2}', 'i')
                //console.log('Image Text: ' + imageTxt);
                var r = imageTxt.match(regex)
                var s = r[0].match(regex2)
                var t = s[0].match(regex3)
                console.log(t[0])

                res.json({ amount: t[0] });
            } else {
                console.log('Image recognitin service failed' + error);
            }
        })

    });

}

module.exports = REST_ROUTER;

