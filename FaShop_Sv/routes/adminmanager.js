var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var adminController = require("../controllers/admin");

router.get("/", async function (req, res, next) {
  let admin = await adminController.getAll();
  res.render("./manager/adminmanager", { admin: admin, title: "Admin Manager" });
});

router.post("/add", async function (req, res, next) {
  let {email, password} = req.body;
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.match(regex)){
    let ad = await adminController.getUserByEmail(email);
    if(!ad){
      let hashPassword = await bcrypt.hashSync(password, 10);
      await adminController.createAdmin(email, hashPassword);
      return res.json({success: true});
    }else{
      return res.json({success: false, msg: 'Email is already!'});
    }
  }else{
    return res.json({success: false, msg: "Your email is not email format"});
  }
});

router.get("/delete/:email", async function (req, res, next) {
  let email = req.params.email;
  if(req.decode.account.email != email){
    await adminController.deleteAdmin(email);
  }
  res.redirect('/adminmanager');
});

module.exports = router;