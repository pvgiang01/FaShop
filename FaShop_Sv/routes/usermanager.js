var express = require("express");
var router = express.Router();

var userController = require("../controllers/users");

router.get("/", async function (req, res, next) {
  let user = await userController.getListUsers();
  res.render("./manager/usermanager", { user: user, title: "User Manager"});
});

router.delete("/:id", async function (req, res, next) {
  const { params } = req;
  await userController.delete((params.id));
  res.json({ result: true });
});

// search
router.get("/search/:value", async function (req, res, next) {
  let key = req.params.value;
  let user = await userController.search(key);
  res.render('./manager/usermanager',{ user });
});


module.exports = router;
