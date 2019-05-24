var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var scheduleCrawler = require('./crawler/index');

scheduleCrawler(); // 定时执行爬虫任务

// 页面路由
var indexRouter = require('./routes/page/index');
var articleRouter = require('./routes/page/article');
var detailRouter = require('./routes/page/detail');
// api 路由
var apiArticleRouter = require('./routes/api/article');
var apiBookRouter = require('./routes/api/book')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/detail', detailRouter);
app.use('/api/article', apiArticleRouter);
app.use('/api/book', apiBookRouter);

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
