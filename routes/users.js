const express = require("express");
const router = express.Router();
const { registerUser, loginuser, finduser } = require("../controllers/users");

router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
router.route("/finduser").post(finduser);

module.exports = router;
