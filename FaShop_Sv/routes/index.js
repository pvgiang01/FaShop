var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const adminController = require('../controllers/admin');
const bcrypt = require('bcryptjs')
const otpController = require('../controllers/otp')
const mailer = require('../utils/nodemailer')
const moment = require('moment')
const authen = require('../middle/authen');
const { validationResult, check } = require('express-validator');

/* hiện trang login. */
router.get('/', function(req, res, next) {
  res.redirect('/login')
});

/* kiểm tra login */
router.get('/' ,[authen.checkLogin],function (req, res, next) {
  res.redirect('dashboard')
});     
router.get('/login', function (req, res, next) {
  res.render('login',{ title: 'Login' });
});
router.get('/reset-password', function (req, res, next) {
  res.render('reset-password', { title: 'Forgot Password' });
})
router.post('/get-otp', async function (req, res, next) {
  let {email} = req.body;
  let admin = await adminController.getUserByEmail(email)
  if(admin){
    let otp = await otpController.generateOTP(email);
    mailer.sendOTP(email, otp);
    res.json({success: true, data: admin});
  }else{
    res.json({success: false, msg: "Email not found!"});
  }
})

router.post('/verify-otp', async function (req, res, next) {
  let {otp, email} = req.body;
  let admin = await adminController.getUserByEmail(email)
  if(admin){
    let sOtp = await otpController.getOTP(email);
    if(otp === sOtp.otp && moment(new Date()).isBefore(sOtp.exprire)){
      res.json({success: true, msg: "Verify success!"});
    }else{
      res.json({success: false, msg: "Verify fail! try again."});
    }
  }else{
    res.json({success: false, msg: "Email not found!"});
  }
})

router.post('/change-password', async function (req, res, next) {
  let {password, email} = req.body;
  let admin = await adminController.getUserByEmail(email)
  if(admin && password){
    if(password.length < 6){
      res.json({success: false, msg: "Min 6 characters!"});
    }else{
      adminController.updatePassword(email, password);
      res.json({success: true, msg: "Update password success!"});
    }
  }else{
    res.json({success: false, msg: "Data invalid!"});
  }
})
/* thực hiện login */
router.post('/login', async function(req, res, next){
  const {email, password} = req.body;
  const checkLogin = await adminController.getUserByEmail(email,password)
  if(checkLogin){
    const token = jwt.sign(
      { id: checkLogin.id, email: checkLogin.email },
      process.env.JWT_SECRET_KEY
    );
    req.session.token = token;
    res.redirect('/dashboard');
  } else {
    res.render('login', { err: 'Tài khoản hoặc Mật khẩu không đúng' });
  }
})
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  })
});
router.post('/test-validation', async function (req, res, next) {
  await check('username').trim().isLength({ min: 6 })
    .withMessage('Username length invaild').run(req);
    await check('password').trim().isLength({ min: 6 })
    .withMessage('Password length invaild')
    .bail()
    .not()
    .isIn(['@','*']) //password k chua nhung ki tu trong ngoac
    .withMessage('password chua nhung tu k cho phep')
    .bail()
    .matches(/\d/) // password phai co so
    .withMessage('password phai co so')
    .run(req);
    await check('password_confirm').custom(
      (value,{req}) =>{
        if(value !== req.body.password){
          throw new Error('password confirm no match');
        }
        return true;
      }
    ).run(req);
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({status:false, error: result.array()});
  } else {
    res.json({ status: true, user });
  }
});
module.exports = router;
