var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search',function(req,res){
	console.log('hey');
	res.render('search',{
		title : "Search Your Contact"
	});
});

router.get('/adduser',function(req,res){
	console.log('Hello');
	res.render('adduser',{
		title : "Add User"
	});
});

router.post('/adduser',function(req,res){
	var name = req.body.name;
	var number = req.body.number;

	console.log(name);

	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('number','Number is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(errors);
		res.render('adduser',{
			errors:errors
		});
	}else{
		User.findOne({'name':name},function(err,user){
			if(user){
				console.log('already exists');
				res.render('adduser');
			}else{
				var newUser = new User({
				name: name,
				number: number
				});
				newUser.save(function(err){
					if(err){
						console.log(err);
						return;
					}else{
						res.redirect('/');
					}
				});
			}
		});	
	}
});

router.post('/search',function(req,res){
	var name = req.body.name;
	User.findOne({'name':name},function(err,user){
		if(user){
			console.log('user found');
			res.render('result',{
				user:user
			});
		}else{
			console.log('No user with the above name found. :p');
			res.redirect('search');
		}
	});
});

module.exports = router;
