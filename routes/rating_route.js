var express = require('express');
var router = express.Router();
var ratingDal = require('../model/rating_dal');
//var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    ratingDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllRatings.ejs', {rs: result});
        }
    );
});


router.get('/allrates', function(req, res) {
    ratingDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllAverageRatings.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    ratingDal.GetByID2(req.query.store_ID, function (err, result) {
            if (err) throw err;

            res.render('displayRatingInfo.ejs', {rs: result, store_ID: req.query.store_ID});
        }
    );
});




router.get('/get', function (req, res) {
    ratingDal.GetByID3(req.query.store_ID, function (err, result) {
            if (err) throw err;

            res.render('displayAverageRatingInfo.ejs', {rs: result, store_ID: req.query.store_ID});
        }
    );
});




router.get('/create', function(req, res) {
    ratingDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('rateFormCreate.ejs', {rating: result});
        }
    });

});



router.post('/insert_rating', function(req, res) {
    console.log(req.body);
    ratingDal.Insert(req.body,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });
});


//DONT REALLY NEED THIS, WONT BE EDITING THE RATINGS, JUST ADDING THEM
router.get('/edit', function(req, res){
    console.log('/edit user_ID:' + req.query.user_ID);

    storeDal.GetByID(req.query.store_ID, function(err, store_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(brownie_result);
            res.render('movieFormEdit.ejs', {rs: brownie_result, message: req.query.message});

        }
    });
});

// Added for Lab 10
//MAYBE YOU NEED THIS IDK FOR WHAT EXACTLY THOUGH
router.post('/update_rating', function(req,res){
    console.log(req.body);
    // first update the movie
    ratingDal.Update(req.body._id, req.body.movie_title, req.body.tagline, req.body.genre_id,
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
            movieDal.GetByID(req.body.movie_id, function(err, movie_info){
                genreDal.GetAll(function(err, genre_result){
                    console.log(genre_result);
                    res.redirect('/movie/edit?movie_id=' + req.body.movie_id + '&message=' + message);
                    //res.render('movie/movie_edit_form', {rs: movie_info, genres: genre_result});
                });
            });

        });
});



module.exports = router;