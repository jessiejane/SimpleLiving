
var mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
    var self = this;

    router.get("/", function (req, res) {
        res.json({ "Message": "Hello World !" });
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
        var table = ["List","ListId",req.params.ListId];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({"Error" : false, "Message" : "Deleted the list with id "+ req.params.ListId});
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

    router.patch("/items/:ItemId/", function (req, res) {

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
        query = mysql.format(query, table);

        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({ "Error": false, "Message": "Success", "List": rows });
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
        var itemCount = distance / itemSize;

        if (itemCount <= itemThreshold) {
            console.log("Item too low");
            push("4abe2ec0d7faeb4521630176365544760dcd073dec8c254bff2078d1b5d91ee9");
            push("a0847f09ae68fb5b5304c82bfdfe88069e8a9b32fe5830b0e6a7182292274d29");
            // add notification code here
        }

        // database call here

        res.json({ message: "Got a post /sensorReading request." + itemId + " " + sensorReading });
    });

    router.delete("/items/:ItemId/", function (req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["Item","ItemId",req.params.ItemId];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query: " + err });
            } else {
                res.json({"Error" : false, "Message" : "Deleted the item with id "+ req.params.ItemId});
            }
        });
    });


}

module.exports = REST_ROUTER;
