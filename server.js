var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meal_tracker', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'pug');

var port = process.env.PORT || 8080;

app.use('/meal', require('./routes/meal'));

app.listen(port);
console.log('Server on ' + port);
