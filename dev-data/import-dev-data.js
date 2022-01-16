const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');

// insert config.env variables into the app

//Connecting to db
console.log(process.env.DATABASE);

const DB_CONNECTION_STRING = process.env.DATABASE.replace(
	'<PASSWORD>',
	encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose.connect(DB_CONNECTION_STRING).then(() => {
	console.log('DB Connection Successful');
});

const recipes = JSON.parse(
	fs.readFileSync(`${__dirname}/recipes.json`, 'utf-8')
);

const importData = async () => {
	try {
		await Recipe.create(recipes);
		console.log('Data loaded successfully!!!');
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Recipe.deleteMany();
		console.log('Data deleted successfully!!!');
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}

console.log(process.argv);
