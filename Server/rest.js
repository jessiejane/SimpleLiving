"use strict"
var mysql = require("mysql");
var request = require('request');
var push = require("./push.js");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

function calculateItemQty(sensorReading){
    var itemSize = 5;
    var emptySize = 50;
    var itemThreshold = 2;
    var distance = emptySize - sensorReading;
    return Math.round(Number(distance/itemSize));     
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
    var self = this;

    router.get("/", function (req, res) {
        res.json({ "Message": "Hello World !" });
    });
    
    //#region User Crud Operation 
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

    router.patch("/user/:UserId", function (req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var params = ["User", "HouseId", req.body.HouseId, "Name", req.body.Name, "VenmoId", req.body.VenmoId, "DeviceId", req.body.DeviceId,
                    "ImageUrl", req.body.ImageUrl, "DeviceToken", reqb.body.DeviceToken, "ItemId", req.params.UserId];

        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "User with id " + req.params.UserId + " was updated", "User": rows });
            }
        });
    });

    router.delete("/user/:UserId", function (req, res) {
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
    //#endregion User Crud Operation 

    //#region House Crud Operation
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

    router.get("/house/:HouseId/lists", function (req, res) {
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

    router.get("/house/:HouseId/users", function (req, res) {
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

    router.post("/house", function (req, res) {
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var params = ["House", "Name", "Address", "BulletinInfo", req.body.Name, req.body.Address, req.body.BulletinInfo];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House Added!", "House": rows });
            }
        });
    });

    router.patch("/house/:HouseId", function (req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?";
        var table = ["House", "Name", req.body.Name, "Address", req.body.Address, "BulletinInfo", req.body.BulletinInfo, "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "House with id " + req.params.HouseId + " was updated", "House": rows});
            }
        });
    });

    router.delete("/house/:HouseId", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["House", "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the house with id " + req.params.HouseId });
            }
        });
    });

    router.delete("/house/:HouseId/users", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["User", "HouseId", req.params.HouseId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted all users with HouseId " + req.params.HouseId });
            }
        });
    });
    //#endregion House Crud Operation

    //#region List Crud Operation
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

    router.get("/list/:ListId/items", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var params = ["Item", "ListId", req.params.ListId];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "Item": rows });
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

    router.patch("/lists/:ListId", function (req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["List", "Name", req.body.Name, "HouseId", req.body.HouseId, "ListId", req.param.ListId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "List with id " + req.params.ListId + " was updated", "List": rows});
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

    router.delete("/lists/:ListId/items/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["Item", "ListId", req.params.ListId];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Deleted the list with id " + req.params.ListId });
            }
        });
    });
    //#endregion List Crud Operation

    //#region Item Crud Operation
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
        var itemCount = calculateItemQty(req.body.SensorReading);
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
        var params = ["Item", "HouseId", "Name", "IsSmartStock", "ListId", "Description", "AmazonProductId", "SensorReading", "Quantity",
            req.body.HouseId, req.body.Name, req.body.IsSmartStock, req.body.ListId, req.body.Description, req.body.AmazonProductId, 
            req.body.SensorReading, itemCount];
        query = mysql.format(query, params);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Item Added!", "Item": rows });
            }
        });
    });

    router.patch("/items/:ItemId", function (req, res) {
        var itemCount = calculateItemQty(req.body.SensorReading)

        if (itemCount <= itemThreshold) {
            console.log('Item too low');
            res.json({ "Error": true, "Message": "Item too low" });
            // add notification code here    
        }

        var query = "UPDATE ?? SET ?? = ?, ? = ?, ? = ?, ? = ?, ?? = ?, ? = ?, ? = ?, ? = ? WHERE ?? = ?";
        var params = ["Item", "HouseId", req.body.HouseId, "Name", req.body.Name, "IsSmartStock", req.body.IsSmartStock, 
            "ListId", req.body.ListId, "Description", req.body.Description, "AmazonProductId", req.body.AmazonProductId,
            "SensorReading", req.body.SensorReading, "Quantity", itemCount, "ItemId", req.params.ItemId];

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
    //#endregion Item Crud Operation


    router.post("/sensorReading", function (req, res) {
        var itemId = req.body.itemId;
        var itemCount = calculateItemQty(req.body.sensorReading);

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
        var imageData = req.body.imageData;
        var imageTxt = "";

        var jsonBody = JSON.stringify({
            "requests": [
                {
                    "image": {
                        "content": imageData
                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION"
                        }
                    ]
                }
            ]
        })

        console.log(imageData);

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
                console.log('Image recognition service failed: ' + error);
            }
        })

    });

}

module.exports = REST_ROUTER;

