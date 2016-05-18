var express = require('express');
var router = express.Router();
var storeDal = require('../model/store_dal');
var locationDal = require('../model/location_dal');

router.get('/all', function(req, res) {
    storeDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllStores.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    storeDal.GetByIDtwo(req.query.store_ID, function (err, result) {
            if (err) throw err;

            res.render('displayStoreInfo.ejs', {rs: result, store_ID: req.query.store_ID});
        }
    );
});


router.get('/create', function(req, res) {
    locationDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('storeFormCreate.ejs', {location: result});
        }
    });

});

router.get('/save', function(req, res, next) {
    console.log("movie_title equals: " + req.query.movie_title);
    console.log("the tagline submitted was: " + req.query.tagline);
    movieDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the movie.");
        }
    });
});


// Added for Lab 10
router.post('/insert_store', function(req, res) {
    console.log(req.body);
    storeDal.Insert(req.body.store_name, req.body.state, req.body.zipcode, req.body.location_ID,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});



router.get('/edit', function(req, res){
    console.log('/edit store_ID:' + req.query.store_ID);

    storeDal.GetByID2(req.query.store_ID, function(err, store_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(store_result);
             locationDal.GetAll(function(err, loc_result){
                 console.log(loc_result);
                res.render('storeFormEdit.ejs', {rs: store_result, location: loc_result, message: req.query.message});
             });
        }
    });
});





// Added for Lab 10

router.post('/update_store', function(req,res){
    console.log(req.body);
    // first update the movie
    storeDal.Update(req.body.store_ID, req.body.store_name, req.body.location_ID,
        req.body.state, req.body.zipcode,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';
            }
            // next update the genres
            storeDal.GetByID(req.body.store_ID, function(err, store_info){
                locationDal.GetAll(function(err, loc_result){
                    console.log(loc_result);
                    res.redirect('/store/edit?store_ID=' + req.body.store_ID + '&message=' + message);
                    //res.render('movie/movie_edit_form', {rs: movie_info, genres: genre_result});
                });
            });

        });
});





// Added for Lab 10

router.get('/delete', function(req, res){
    console.log(req.query);
    storeDal.GetByID(req.query.store_ID, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            storeDal.DeleteById(req.query.store_ID, function (err) {
                res.send(result[0].store_name + ' Successfully Deleted');
            });
        }
        else {
            res.send('store does not exist in the database.');
        }
    });
});

// module.exports = router;



module.exports = router;