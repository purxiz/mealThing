var express = require('express');
var dateFormat = require('dateformat');
var router = express.Router();

var Meal = require('../models/meal');

function renderSite(res) {
	var date = new Date();
	
	var calories, fat, carbs, protein;
	date.setHours(0,0,0,0);
	console.log(date)
	Meal.find({date: date}, function (err, results) {
		protein = results.reduce( (a, b) => {
			return a + Number(b.protein) || 0;
		}, 0);
		fat = results.reduce( (a, b) => {
			return a + Number(b.fat) || 0;
		}, 0);
		carbs = results.reduce( (a, b) => {
			return a + Number(b.carbs) || 0;
		}, 0);
		calories = results.reduce( (a, b) => {
			return a + Number(b.calories.total) || 0;
		}, 0);

		var macros = true;

		if(results.some( record => !record.macros)) {
			macros = false;
		}

		console.log(macros);

		res.render('meal', {
			date: dateFormat(date, 'dddd "the" dS "of" mmmm, yyyy'),
			calories: calories,
			protein: protein,
			fat: fat,
			carbs: carbs,
			macros: macros,
		});
	});
	

};

router.route('/')
	.get( (req, res) => {
		renderSite(res);
	})
	.post( (req, res) => {

		var macros = true;
		
		if(!req.body.calories) {
			if(!req.body.protein && !req.body.fat && !req.body.carbs) {
				res.json({error: 'no values'});
			}
			else {
				req.body.calories = Number(req.body.protein) + Number(req.body.fat) + Number(req.body.carbs);
			}
		}
		else if( Number(req.body.calories) !== Number(req.body.protein) + Number(req.body.fat) + Number(req.body.carbs) ) {
			macros = false;
		}
		var date = new Date();
		date.setHours(0,0,0,0);
		console.log(date)

		var meal = new Meal({
			name: req.body.name,
			calories: {
				total: req.body.calories,
				protein: req.body.protein,
				carbs: req.body.carbs,
				fat: req.body.fat,
			},
			date: date,
			macros: macros,
		});

		meal.save().then(res.redirect('/meal'));
	});

module.exports = router;
