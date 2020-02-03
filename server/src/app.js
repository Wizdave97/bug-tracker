var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dIContainer=require('./lib/diContainer').default()
dIContainer.factory('usersRouter',require('./routes/users').default)
dIContainer.factory('projectsRouter',require('./routes/projects').default)
dIContainer.factory('featuresRouter',require('./routes/features').default)
dIContainer.factory('logsRouter',require('./routes/logs').default)
dIContainer.factory('helpers',require('./lib/helpers').default)
dIContainer.factory('__data',require('./__data/data').default)
dIContainer.register('models',require('./models'))
dIContainer.register('hashKey','aBigSecret')
dIContainer.factory('users',require('./controllers/users').default)
dIContainer.factory('projects',require('./controllers/projects').default)
dIContainer.factory('features',require('./controllers/features').default)
dIContainer.factory('logs',require('./controllers/logs').default)
var indexRouter = require('./routes/index');


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', dIContainer.get('usersRouter'));
app.use('/logs',dIContainer.get('logsRouter'));
app.use('/projects', dIContainer.get('projectsRouter'));
app.use('/features', dIContainer.get('featuresRouter'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
