/**
 * Created by nassersally on 5/5/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM locations;',
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
}


exports.GetByID = function(location_ID, callback) {

    console.log(location_ID);
    var query = 'SELECT * FROM locations WHERE location_ID =' + location_ID;
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



/*exports.Insert = function(state_name, callback) {
 var qry = "INSERT INTO state (state_name) VALUES (?)";
 connection.query(qry, state_name, function(err, result){
 callback(err, result);
 });
 }
 */




exports.Insert = function(account_info, callback) {
    console.log(account_info);
    var dynamic_query = 'INSERT INTO location (loc_name) VALUES (' +
        '\'' + account_info.loc_name + '\'' +
        ');';

    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );

}



exports.Update = function(location_ID, loc_name, callback) {
    console.log(location_ID, loc_name );
    var values = [state_name, state_id];

    connection.query('UPDATE location SET loc_name = ? WHERE location_ID = ?', values,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
        });
}


var Delete = function(location_ID, callback) {
//function Delete(movie_id, callback) {
    var qry = 'DELETE FROM location WHERE location_ID = ?';
    connection.query(qry, [location_ID],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = Delete;