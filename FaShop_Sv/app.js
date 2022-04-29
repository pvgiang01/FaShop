/**
 * thư viện cần thiết
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

const cors = require('cors');
const hbs = require('hbs');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
require('./models/admin');
require('./models/cart')
require('./models/category');
require('./models/oder')
require('./models/oderdetail')
require('./models/otp')
require('./models/product');
require('./models/user');
require('./models/voucher')
/**
 * khởi tạo app
 */
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit:'1024mb'}));
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(session({
  secret: 'hhh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}))
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('>>>>>DB connected!!!'))
  .catch(err => console.log('>>>>>>>>DB error: ', err));
app.use(cors());
/**
 * stt
 */
hbs.registerHelper('soThuTu', function (a, b) {
  return a + 1;
});
hbs.registerHelper('formatDate', function (a, type, b) {
  let date = new Date(a);
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  month = month.toString().length === 1 ? '0' + month : month;
  let day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString();
  if (type == 1) {
    return day + '-' + month + '-' + year;
  } else {
    return year + '-' + month + '-' + day;
  }
});
hbs.registerHelper('getCategoryName', function (id, categories, b) {
  const category = categories.filter(c => c._id.toString() === id.toString())[0];
  console.log(category);
  return category.name;
});
hbs.registerHelper('compareCategory', function (_id, id, b) {
  return _id.toString() === id.toString();
});
hbs.registerHelper('isDefine', function (a, b, t) {
  return a.toString() == b.toString();
});
hbs.registerHelper('available', function (a) {
  return a ? "Còn hàng" : "Hết hàng";
});
hbs.registerHelper('isAdmin', function(role){
  return role == 1;
})
hbs.registerHelper('convertDate', function (a, inputDate, inputTime) {
  let date = new Date(a);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  if (inputDate) {
    return year + '-' + month + '-' + day;
  }
  if (inputTime) {
    return hour + ':' + minute + ':' + second;
  }
  return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
});
/**
* đường dẫn
*/
var adminmanagerRouter = require('./routes/adminmanager')
var cartRouter = require('./routes/cart');
var categoriesRouter = require('./routes/category');
var dashboard = require('./routes/dashboard');
var indexRouter = require('./routes/index');
var orderRouter = require('./routes/order');
var statistical = require('./routes/statistical');
var poductsRouter = require('./routes/product');
var usermanagerRouter = require('./routes/usermanager');
var voucherRouter = require('./routes/voucher');
var apiUserRouter = require('./routes/api_user');
var apiProductRouter = require('./routes/api_product');
var apiVoucherRouter = require('./routes/api_voucher');
var apiCartRouter = require('./routes/api_cart')
var apiCategoryRouter = require('./routes/api_category')
app.use('/', indexRouter);
app.use('/product', poductsRouter);
app.use('/dashboard', dashboard);
app.use('/category', categoriesRouter);
app.use('/cart', cartRouter);
app.use('/adminmanager', adminmanagerRouter);
app.use('/usermanager',usermanagerRouter);
app.use('/voucher',voucherRouter);
app.use('/order',orderRouter);
app.use('/statistical',statistical);
app.use('/api_user', apiUserRouter);
app.use('/api_product', apiProductRouter);
app.use('/api_cart',apiCartRouter);
app.use('/api_voucher',apiVoucherRouter);
app.use('/api_category',apiCategoryRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
