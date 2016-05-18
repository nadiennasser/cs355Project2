var express = require('express');
var router = express.Router();
var accountDal = require('../model/account_dal');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Brownie Stores For You!' });
});

*/

router.get('/', function(req, res, next) {
  var data = {
    title : 'Brownie Stores For You!'
  }
  if(req.session.account === undefined) {
    res.render('index', data);
  }
  else {
    data.first_name = req.session.account.first_name;
    res.render('index', data);
  }
});




router.get('/authenticate', function(req, res) {
  accountDal.getByEmail(req.query.email, req.query.pass_word, function (err, account) {
    if (err) {
      res.send(err);
    }
    else if (account == null) {
      res.send("Account not found.");
    }
    else {
      req.session.account = account;
      res.send(account);
    }
  });
});




router.get('/login', function(req, res) {
  res.render('login.ejs');
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('logout.ejs');
  });
});

module.exports = router;
