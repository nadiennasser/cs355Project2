var mysql = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM account_user_info2;',
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
exports.GetByID = function(user_ID, callback) {

    console.log(user_ID);
    var query = 'SELECT * FROM account_user_info2 WHERE user_ID=' + user_ID;
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


exports.getByEmail = function(email, pass_word, callback) {
    var query = 'CALL Account_getByEmail(?, ?)';
    var query_data = [email, pass_word];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
/* NOTE: Stored Procedure results are wrapped in an extra array
 /* and only one user record should be returned,
 // so return only the one result */
        else if(result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
             callback(err, null);
        }
    });
 }




exports.Insert = function(first_name, last_name, email, pass_word, callback) {
    var values = [first_name, last_name, email, pass_word];
    connection.query('INSERT INTO account_user_info2 (first_name, last_name, email, pass_word)' +
        ' VALUES (?, ?, ?, ?)', values,
        function (err, result) {

            if (err){
                callback(err);
            }
        });
}