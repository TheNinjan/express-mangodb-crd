var express = require('express');
var router = express.Router();
const userModel = require("./users");
const { use } = require('../app');
const session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// cookie examples
router.get('/cookie', function (req, res, next) {
  res.cookie("name", "Ninjan100")
  res.send("Cookies set");
});
router.get('/cookieread', function (req, res, next) {
  res.send(`your name is ${req.cookies.name}`);
});
router.get('/cookiedelete', function (req, res, next) {
  res.clearCookie('name')
  res.send(`your name is ${req.cookies.name}`);
});

// session examples 
router.get('/ban', function (req, res, next) {
  req.session.banned = true;
  res.render('index', { title: 'banned' });
});
router.get('/isbanned', function (req, res, next) {
  if (req.session.banned === true) {
    res.send("You are banned ");
  }
  else {
    res.send("You are not banned ");
  }
});


router.get('/removeban', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      throw err
    }
    console.log(err)
  })
  res.send("Ban removed");
});


//  DB operation examples
router.get('/create', async function (req, res) {
  const createdUser = await userModel.create({
    username: "ninjan100",
    name: "ninjan",
    age: 23

  })
  res.send(createdUser)
});
router.get('/allusers', async function (req, res) {
  // const allUsers = await userModel.find()
  const allUsers = await userModel.findOne({ username: "ninjan100" })
  res.send(allUsers)
});
router.get('/delete', async function (req, res) {
  const deletedUser = await userModel.findOneAndDelete({ username: "ninjan100" })
  res.send(deletedUser)
});

module.exports = router;
