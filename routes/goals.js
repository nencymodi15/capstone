const express = require("express");
const router = express.Router();
const {
  addGoal,
  FindGoal,
  findoneGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goals");

router.route("/addGoal").post(addGoal);
router.route("/FindGoal").post(FindGoal);
router.route("/findoneGoal").post(findoneGoal);
router.route("/deleteGoal").post(deleteGoal);
router.route("/updateGoal").post(updateGoal);

module.exports = router;
