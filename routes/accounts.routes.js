const express = require("express");
const router = express.Router();

const accountsController = require("../controller/accounts.controller");

router.post("/createAccounts", accountsController.createAccount);
router.post("/getAccountsDetails", accountsController.getAccounts);
router.post("/depositeAmount", accountsController.depositeAmount);
router.post("/withDrawl", accountsController.withDrawl);
router.post("/getWithDrawlDetails", accountsController.getWithDrawlDetails);
router.post("/getDepositeDetails", accountsController.getDepositeDetails);
router.post("/loanApply", accountsController.loanApply);

module.exports = router;
