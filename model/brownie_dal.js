var mysql = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM brownies;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};


// Returns the size, name, and type of the brownie
exports.GetByID2 = function(brownie_ID, callback) {

    console.log(brownie_ID);
    var query = 'SELECT * FROM store_brownie_info WHERE brownie_ID=' + brownie_ID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};



// Returns the size, name, and type of the brownie
exports.GetByID = function(brownie_ID, callback) {

    console.log(brownie_ID);
    var query = 'SELECT * FROM brownies WHERE brownie_ID=' + brownie_ID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};