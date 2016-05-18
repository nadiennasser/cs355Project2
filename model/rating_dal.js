/**
 * Created by nassersally on 5/5/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM b_stores;',
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


exports.GetByID = function(store_ID, callback) {

    console.log(store_ID);
    var query = 'SELECT * FROM rating WHERE store_ID =' + store_ID;
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



exports.GetByID2 = function(store_ID, callback) {

    console.log(store_ID);
    var query = 'SELECT * FROM store_rating_info WHERE store_ID =' + store_ID;
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




exports.GetByID3 = function(store_ID, callback) {

    console.log(store_ID);
    var query = 'SELECT * FROM avg_store_rate WHERE store_ID =' + store_ID;
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
    var dynamic_query = 'INSERT INTO b_users (first_name, pass_word) VALUES (' +
        '\'' + account_info.first_name + '\'' +
        '\'' + account_info.pass_word + '\'' +
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


//MAYBE WONT NEED THIS EITHER!!
exports.Update = function(location_ID, loc_name, callback) {
    console.log(location_ID, loc_name );
    var values = [state_name, state_id];

    connection.query('UPDATE rating SET loc_name = ? WHERE location_ID = ?', values,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
        });
}


//MAYBE WONT NEED IDK WHAT YET
var Delete = function(location_ID, callback) {
//function Delete(movie_id, callback) {
    var qry = 'DELETE FROM location WHERE location_ID = ?';
    connection.query(qry, [location_ID],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = Delete;