var express = require('express');
var router = express.Router();
var accountDal = require('../model/account_dal');
//var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res) {
    accountDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllAccounts.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    accountDal.GetByID(req.query.user_ID, function (err, result) {
            if (err) throw err;

            res.render('displayAccountInfo.ejs', {rs: result, user_ID: req.query.user_ID});
        }
    );
});

router.get('/create', function(req, res) {
    // locationDal.GetAll( function(err, result){

            res.render('accountCreate.ejs', {location: res});
    // });

});


router.post('/insert_account', function(req, res) {
    console.log(req.body);
    accountDal.Insert(req.body.first_name, req.body.last_name, req.body.email, req.body.pass_word,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});

module.exports = router;