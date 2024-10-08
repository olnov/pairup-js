var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { syncDatabase } = require('./db/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const specialismsRouter = require('./routes/specialisms');
const cohortsRouter = require('./routes/cohorts');
const studentsRouter = require('./routes/students');
const authRouter = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

// Initializing DB. Use 'true' if you need to recreate DB schema
syncDatabase(false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/specialisms', specialismsRouter);
app.use('/cohorts', cohortsRouter);
app.use('/students', studentsRouter);
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
  res.render('error');
});

module.exports = app;
