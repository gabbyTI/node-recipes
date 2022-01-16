const Recipe = require('../models/recipeModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const catchAsync = require('../utils/catchAsync');

exports.getAllRecipes = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Recipe.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();

	const recipes = await features.query;

	res.status(200).json({
		status: 'success',
		count: recipes.length,
		recipes,
	});
});

exports.getRecipe = catchAsync(async (req, res, next) => {
	const recipe = await Recipe.findById(req.params.id);

	if (!recipe) {
		const err = new AppError(`Recipe with that ID was not found`, 404);
		return next(err);
	}

	res.status(200).json({
		status: 'success',
		recipe,
	});
});

exports.createRecipe = catchAsync(async (req, res, next) => {
	const recipe = await Recipe.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			recipe,
		},
	});
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
	const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
		new: true, // make the function return the newly updated record/document from the db
		runValidators: true, // makes the validation specified in schema to be run during this update function
	});

	if (!recipe) {
		const err = new AppError(`Recipe with that ID was not found`, 404);
		return next(err);
	}

	res.status(200).json({
		status: 'success',
		data: {
			recipe,
		},
	});
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
	const recipe = await Recipe.findByIdAndDelete(req.params.id);

	if (!recipe) {
		const err = new AppError(`Recipe with that ID was not found`, 404);
		return next(err);
	}

	res.status(204).json({
		status: 'success',
	});
});
