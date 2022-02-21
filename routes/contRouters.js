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
// router.get("/signup", UserController.paginaSignup);
// router.post("/login", UserController.loginUser);
// router.post("/signup", UserController.signupUser);
// router.get("/logout", UserController.logoutUser);

module.exports = router;

