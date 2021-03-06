const Twitter = require('twitter');
const express = require('express');

const app = express();

//Create Twitter Client
const client = new Twitter({
	consumer_key: 'fx95oKhMHYgytSBmiAqQ',
	consumer_secret: '0zfaijLMWMYTwVosdqFTL3k58JhRjZNxd2q0i9cltls',
	access_token_key: '2305278770-GGw8dQQg3o5Vqfx9xHpUgJ0CDUe3BoNmUNeWZBg',
	access_token_secret: 'iEzxeJjEPnyODVcoDYt5MVvrg90Jx2TOetGdNeol6PeYp',
});

//Setup Middlewares
//I used CORS in development when serving from webpack-dev-server on localhost:8080
//cors: Allow for Cross Origin requests for specific domains
//morgan: More detailed logging. 'dev': multicolored, concise, descriptive
if (process.env.NODE_ENV === 'development'){
	const morgan = require('morgan');
	const cors = require('cors');

	const corsOptions = {
		origin: 'http://localhost:8080'
	}
	app.use(cors(corsOptions));
	app.use(morgan('dev'));
}



//Set up routes.
app.use('/', express.static('dist'));

app.get('/', (req, res) => {
	res.status(200).render('index.html');
});

app.get('/twitter/user/search', (req, res) => {
	const username = req.query.username;

	client.get('/users/search', { q: username }, (error, users, response) => {
		if (error) {
			res.status(error.code).send({ error });
		} else {
			res.status(200).send({ users, response });
		}
	});

});

app.listen(3001, () => {
	/* eslint-disable no-console */
	console.log('listening on port 3001...');
	/* eslint-enable no-console */
});
