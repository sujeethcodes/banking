const handler = require("express-async-handler");
const Sequelize = require("sequelize");
const Loan = require("../model/loan.model");
const Accounts = require("../model/accounts.model");
const LoanApply = require("../model/loan.model");
const constantUtils = require("../utils/constant.utils");
const Deposite = require("../model/deposite.model");
const WithDrawl = require("../model/withdrawl.model");
const Log = require("../model/log.model");
const controller = {};

controller.getLoanApplyDetails = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";
  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";
  const loanApplyDetails = await LoanApply.findOne({
    where: {
      accountNumber: verifyAccount?.accountNumber,
    },
    include: {
      model: Accounts,
    },
  });
  if (!loanApplyDetails) throw "SOMETHING_WENT_WRONG";
  return res.json({
    loanApplyDetails: loanApplyDetails,
  });
});

controller.getApprovalPendingLoanDetails = handler(async (req, res) => {
  if (!req?.body?.approval) throw "APPROVAL_VALUE_REQUIRED";
  if (req?.body?.approval !== constantUtils.PENDING) throw "INVAILD_VALUE";

  const approvalPendingLoanDetails = await LoanApply.findAll({
    where: {
      approval: req?.body?.approval,
    },
    skip: req?.body?.skip ?? 0,
    limit: req?.body?.limit ?? 25,
  });
  if (!approvalPendingLoanDetails) throw "SOMETHING_WENT_WRONG";
  return res.json(
    approvalPendingLoanDetails.length === 0
      ? { approvalPendingLoanDetails: constantUtils.NO_PENDING_APPROVAL }
      : { approvalPendingLoanDetails: approvalPendingLoanDetails }
  );
});

controller.getApprovedLoanList = handler(async (req, res) => {
  if (!req?.body?.approval) throw "APPROVAL_VALUE_REQUIRED";
  if (req?.body?.approval !== constantUtils.APPROVED) throw "INVAILD_VALUE";

  const getApprovedLoanList = await LoanApply.findAll({
    where: {
      approval: req?.body?.approval,
    },
    skip: req?.body?.skip ?? 0,
    limit: req?.body?.limit ?? 25,
  });
  if (!getApprovedLoanList) throw "SOMETHING_WENT_WRONG";
  return res.json(
    getApprovedLoanList.length === 0
      ? { getApprovedLoanList: constantUtils.NO_PENDING_APPROVAL }
      : { getApprovedLoanList: getApprovedLoanList }
  );
});

controller.overDepositeAccount = handler(async (req, res) => {
  const overDeposite = await Deposite.findAll({
    attributes: [
      "accountNumber",
      [Sequelize.fn("COUNT", Sequelize.col("*")), "depositCount"],
    ],
    group: ["accountNumber"],
    order: [[Sequelize.literal("depositCount"), "DESC"]],
  });
  if (!overDeposite) throw "SOMETHING_WENT_WRONG";
  res.json(overDeposite);
});

controller.overWithDrawlAccount = handler(async (req, res) => {
  const overDeposite = await WithDrawl.findAll({
    attributes: [
      "accountNumber",
      [Sequelize.fn("COUNT", Sequelize.col("*")), "withdrawlCount"],
    ],
    group: ["accountNumber"],
    order: [[Sequelize.literal("withdrawlCount"), "DESC"]],
  });
  if (!overDeposite) throw "SOMETHING_WENT_WRONG";
  res.json(overDeposite);
});

controller.loanApproval = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";

  if (!req?.body?.approval) throw "APPROVAL_VALUE_REQUIRED";

  if (
    ![constantUtils.APPROVED, constantUtils.REJECT].includes(
      req?.body?.approval
    )
  )
    throw "INVAILD_APPROVAL_VALUES";

  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  const loanApprovalpending = await Loan.findOne({
    where: {
      accountNumber: verifyAccount?.accountNumber,
    },
  });

  loanApprovalpending.approval = req?.body?.approval;
  await loanApprovalpending.save();

  const log = await Log.create({
    accountNumber: verifyAccount?.accountNumber,
    approval: loanApprovalpending.approval,
    date: new Date(),
  });
  if (!log) throw "LOG_FAILED";

  res.json(`${loanApprovalpending.approval} SUCCESSFULY`);
});

module.exports = controller;
