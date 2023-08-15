const express = require("express")
const router = express.Router();
const {findSpending,addSpending,findoneSpending,deleteSpending/*,updateSpending*/} = require("../controllers/spendings")

router.route("/addSpending").post(addSpending);
/*router.route("/editSpending").post(updateSpending);*/
router.route("/findSpending").post(findSpending);
router.route("/findoneSpending").post(findoneSpending);
router.route("/deleteSpending").post(deleteSpending);


module.exports = router;