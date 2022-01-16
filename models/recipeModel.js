const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A recipe must have a name'],
			unique: true,
			trim: true,
			maxLength: [30, 'The recipe name can not be greater than 30 characters'],
		},
		duration: {
			type: Number,
			required: [true, 'A recipe must have a duration(in minutes)'],
			max: [300, 'Recipe must not be greater than 5 hours(300 minutes)'],
			min: [5, "Recipe can't be less than 5 minutes"],
		},
		ingredients: {
			type: [String],
			required: [true, 'A recipe must have ingredients'],
		},
		steps: {
			type: [String],
			required: [true, 'A recipe must have steps'],
		},
		difficulty: {
			type: String,
			required: [true, 'A recipe must have a set difficulty'],
			enum: {
				values: ['easy', 'medium', 'hard'],
				message: 'Difficulty is either easy, medium or hard',
			},
		},
		description: {
			type: String,
			trim: true,
		},
		foodimage: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		isVegan: Boolean,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
