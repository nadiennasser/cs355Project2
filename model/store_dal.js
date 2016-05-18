var mysql = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM store_loc_info;',
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


// Returns the city, state, zipcode for each store
exports.GetByID = function(store_ID, callback) {

    console.log(store_ID);
    var query = 'SELECT * FROM b_stores WHERE store_ID=' + store_ID;
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
    var query = 'SELECT * FROM store_loc_info WHERE store_ID=' + store_ID;
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



exports.GetByIDtwo = function(store_ID, callback) {

    console.log(store_ID);
    var query = 'SELECT * FROM store_loc_info WHERE store_ID=' + store_ID;
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



exports.Insert = function(store_name, state, zipcode, location_ID, callback) {
    var values = [store_name, state, zipcode];
    connection.query('INSERT INTO b_stores (store_name, state, zipcode) VALUES (?, ?, ?)', values,
        function (err, result) {

            if (err == null && location_ID != null) {
                var location_qry_values = [];

                if(location_ID instanceof Array) {
                    for (var i = 0; i < location_ID.length; i++) {
                        location_qry_values.push([result.insertId, location_ID[i]]);
                    }
                }
                else {
                    location_qry_values.push([result.insertId, location_ID]);
                }

                console.log(location_qry_values);

                var location_qry = 'INSERT INTO lookupStoreLoc (store_ID, location_ID) VALUES ?';

                connection.query(location_qry, [location_qry_values], function(err, location_result){
                    if(err) {
                        Delete(result.insertId, function() {
                            callback(err);
                        });
                    }
                    else {
                        callback(err);
                    }
                });
            }
            else {
                callback(err);
            }
        });
}





 var DeleteStoreLocation = function(store_ID, callback) {
 var location_qry = 'DELETE FROM lookupStoreLoc WHERE store_ID = ?';
    connection.query(location_qry, store_ID, function (err, result) {
        callback(err, result);
    });
 };

 var AddStoreLocation = function(store_ID, location_ID, callback) {
    if (location_ID != null) {
        var location_qry_values = [];
        
        if (location_ID instanceof Array) {
            for (var i = 0; i < location_ID.length; i++) {
                location_qry_values.push([store_ID, location_ID[i]]);
            }
        }
    else {
        location_qry_values.push([store_ID, location_ID]);
    }

    var location_qry = 'INSERT INTO lookupStoreLoc (store_ID, location_ID) VALUES ?';
    connection.query(location_qry, [location_qry_values], function (err) {
    callback(err);
    });
    }
 };


 exports.Update = function(store_ID, store_name, location_ID, state, zipcode, callback) {
    console.log(store_ID, store_name, location_ID, state, zipcode);
    var values = [store_name, state, zipcode, store_ID];

    connection.query('UPDATE b_stores SET store_name = ?, state = ?, zipcode = ? ' +
        'WHERE store_ID = ?', values,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
            else {
                // delete all the existing genres for the movie first
                DeleteStoreLocation(store_ID, function(err, result) {
                    //then add them back in.
                    AddStoreLocation(store_ID, location_ID, callback);
                });
            }
        });
 }

 var Delete = function(store_ID, callback) {
    //function Delete(movie_id, callback) {
    var qry = 'DELETE FROM store_loc_info WHERE store_ID = ?';
     connection.query(qry, [store_ID],
        function (err) {
            callback(err);
        });
 }

 exports.DeleteById = Delete;









