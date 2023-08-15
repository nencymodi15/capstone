const express = require("express");
const router = express.Router();
const {
  addIncome,
  findOneIncome,
  findIncome,
  deleteIncome,
  updateIncome,
} = require("../controllers/incomes");

router.route("/addIncome").post(addIncome);
router.route("/updateIncome").post(updateIncome);
router.route("/findIncome").post(findIncome);
router.route("/findOneIncome").post(findOneIncome);
router.route("/deleteIncome").post(deleteIncome);

module.exports = router;
