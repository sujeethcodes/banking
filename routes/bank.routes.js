const express = require("express");
const router = express.Router();
const bankingController = require("../controller/banking.controller");
// router.post("/approved", bankingController.approved);
router.post("/loanApplyDetails", bankingController.getLoanApplyDetails);
router.post(
  "/approvalPendingLoanDetails",
  bankingController.getApprovalPendingLoanDetails
);
router.post("/approvedLoanDetails", bankingController.getApprovedLoanList);
router.post("/overDeposite", bankingController.overDepositeAccount);
router.post("/overWithDrawl", bankingController.overWithDrawlAccount);
router.post("/loanApproval", bankingController.loanApproval);
module.exports = router;
