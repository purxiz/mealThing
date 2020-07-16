var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealSchema = new Schema({
	name: { type: String,  maxlength: 1000 },
	calories: {
		total: Number,
		protein: Number,
		fat: Number,
		carbs: Number,
	},
	date: Date,
	macros: Boolean,
},
);


module.exports = mongoose.model('meal', mealSchema);
