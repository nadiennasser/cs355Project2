var express = require('express');
var router = express.Router();
var extraDal = require('../model/extra_dal');
//var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    extraDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllExtra.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    extraDal.GetByID(req.query.store_ID, function (err, result) {
            if (err) throw err;

            res.render('displayExtraInfo.ejs', {rs: result, store_ID: req.query.store_ID});
        }
    );
});


router.get('/edit', function(req, res){
    console.log('/edit brownie_ID:' + req.query.brownie_ID);

    amenityDal.GetByID(req.query.brownie_ID, function(err, brownie_result){
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
    amenityDal.Update(req.body.movie_id, req.body.movie_title, req.body.tagline, req.body.genre_id,
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