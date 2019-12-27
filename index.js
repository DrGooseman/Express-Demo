const debug = require('debug')('app:startup');
const config= require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development'){
	app.use(morgan('tiny'));
	debug('Morgan enabled...');
}

app.use(function(req, res, next) {
	console.log("Logging...");
	next();
})

app.use(function(req, res, next) {
	console.log("Authenticating...");
	next();
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));