const express = require("express")
const router = express.Router();
const {findBudget,addbudget,findeoneBudget,deleteoneBudget,updateBudget} = require("../controllers/budgets")

router.route("/addBudget").post(addbudget);
router.route("/editBudget").post(updateBudget);
router.route("/findBudget").post(findBudget);
router.route("/findOneBudget").post(findeoneBudget);
router.route("/deleteBudget").post(deleteoneBudget);

module.exports = router;