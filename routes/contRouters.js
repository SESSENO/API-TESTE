const { Router } = require("express");
const ContController = require("../controllers/ContController");
const router = Router();
router.post("/add", ContController.addCont);
router.get("/show", ContController.showCont);
router.get("/showop/:opcode", ContController.showOpcode);
router.get("/reportExp", ContController.showAvExpenses);
router.get("/reportRev", ContController.showAvRevenue);
router.post("/remove", ContController.removeCont);
router.post("/update", ContController.updateCont);
router.get("/monthReport/:month/:year/:opcode", ContController.monthReport);
router.get("/balance/:month/:year", ContController.balanceReport);

module.exports = router;

