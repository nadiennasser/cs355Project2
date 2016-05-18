var express = require('express');
var router = express.Router();
var locationDal = require('../model/location_dal');
//var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    locationDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllLocations.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    locationDal.GetByID(req.query.location_ID, function (err, result) {
            if (err) throw err;

            res.render('displayLocationInfo.ejs', {rs: result, location_ID: req.query.location_ID});
        }
    );
});


router.post('/insert_location', function(req, res) {
    console.log(req.body);
    locationDal.Insert(req.body,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });
});



router.get('/edit', function(req, res){
    console.log('/edit brownie_ID:' + req.query.brownie_ID);

    brownieDal.GetByID(req.query.brownie_ID, function(err, brownie_result){
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

router.post('/update_movie', function(req,res){
    console.log(req.body);
    // first update the movie
    movieDal.Update(req.body.movie_id, req.body.movie_title, req.body.tagline, req.body.genre_id,
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