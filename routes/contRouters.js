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
router.get("/monthReportRev/:month", ContController.monthReportRevenue);
router.get("/monthReportExp/:month", ContController.monthReportExpense);

module.exports = router;

