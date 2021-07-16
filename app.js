var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/node-rss', { promiseLibrary: require('bluebird'), useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connect('mongodb+srv://kanmit:Notice2021@cluster0.yxz4y.mongodb.net/test?authSource=admin&replicaSet=atlas-inkbdl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { promiseLibrary: require('bluebird'), useNewUrlParser: true , useUnifiedTopology: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

const { graphqlHTTP  } = require('express-graphql');

var schema = require('./graphql/settingSchemas');
var cors = require("cors");

var app = express();

app.use('*', cors());


app.use('/graphql', cors(), graphqlHTTP({
// app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
