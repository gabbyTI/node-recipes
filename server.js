const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

//Connecting to db

const DB_CONNECTION_STRING = process.env.DATABASE.replace(
	'<PASSWORD>',
	encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose.connect(DB_CONNECTION_STRING).then(() => {
	console.log('DB Connection Successful');
});

const port = process.env.PORT || 4000;

app.listen(port, 'localhost', () => {
	console.log(`App is listening on http://127.0.0.1:${port}`);
});
