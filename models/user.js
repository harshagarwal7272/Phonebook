var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/phonebook');

//User Schema 
var userSchema = mongoose.Schema({
	name:{
		type: String,
		index: true
	},
	number:{
		type: String,
		index: true
	}
});

var User = module.exports = mongoose.model('User',userSchema);