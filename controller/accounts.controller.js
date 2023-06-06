const handler = require("express-async-handler");
const Accounts = require("../model/accounts.model");
const Deposite = require("../model/deposite.model");
const WithDrawl = require("../model/withdrawl.model");
const LoanApply = require("../model/loan.model");
const constantUtils = require("../utils/constant.utils");
const helperUtils = require("../utils/helper.utils");
const controller = {};

controller.createAccount = handler(async (req, res) => {
  if (!req?.body?.aadharNo) throw "AADHAR_NUMBER_REQUIRED";
  if (!req?.body?.accountHolder) throw "ACCOUNT_HOLDER_REQUIRED";
  if (!req?.body?.accountType) throw "ACCOUNT_TYPE_REQUIRED";
  if (req?.body?.accountType !== constantUtils.ACCOUNT_TYPE)
    throw "INVAILD_ACCOUNT_TYPE";
  const verifyAccount = await Accounts.findOne({
    where: {
      aadharNo: req?.body?.aadharNo,
    },
  });

  if (verifyAccount) throw "THIS_AADHAR_NUMBER_ALREDY_HAVE_A_ACCOUNT";

  const accountNumber = helperUtils.generateRandomNumber(10);
  const createAccount = await Accounts.create({
    aadharNo: req?.body?.aadharNo,
    accountNumber: accountNumber,
    accountHolder: req?.body?.accountHolder,
    accountType: req?.body?.accountType,
    date: new Date(),
  });

  if (!createAccount) throw "SOMETHING_WENT_WRONG";
  res.json({ message: "accounts created successfully" });
});

controller.getAccounts = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";
  const accountsCheck = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!accountsCheck) throw "INVAILD_ACCOUNT_ID";
  return res.json({ message: accountsCheck });
});

controller.depositeAmount = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_ID_REQUIRED";
  if (!req?.body?.deposite) throw "INVALID_DEPOSITE_AMOUNT";

  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });

  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  verifyAccount.balanceAmount =
    verifyAccount.balanceAmount + req?.body?.deposite;

  await verifyAccount.save();
  console.log(verifyAccount?.balanceAmount);
  const deposite = await Deposite.create({
    accountNumber: verifyAccount?.accountNumber,
    deposite: req?.body?.deposite,
    balanceAmount: verifyAccount?.balanceAmount,
    date: new Date(),
  });

  if (!deposite) throw "DEPOSITE_FAILED";

  return res.json({ message: "deposite success" });
});

controller.withDrawl = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_ID_REQUIRED";
  if (!req?.body?.withDrawl) throw "INVALID_WITHDRAWL";

  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  if (verifyAccount.balanceAmount > req?.body?.withDrawl) {
    verifyAccount.balanceAmount =
      verifyAccount.balanceAmount - req?.body?.withDrawl;

    await verifyAccount.save();

    const withDrawl = await WithDrawl.create({
      accountNumber: verifyAccount?.accountNumber,
      balanceAmount: verifyAccount?.balanceAmount,
      withdrawl: req?.body?.withDrawl,
      date: new Date(),
    });
    if (!withDrawl) throw "WITHDRAWL_FAILED";

    return res.json({ message: "withdrawl success" });
  } else {
    return res.json({ message: "insufficent balance" });
  }
});

controller.getWithDrawlDetails = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";
  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  const getWithDrawlDetails = await WithDrawl.findAll({
    where: {
      accountNumber: verifyAccount?.accountNumber,
    },
    offset: req?.body?.offset ?? 0,
    limit: req?.body?.limit ?? 25,
  });
  if (!getWithDrawlDetails) throw "SOMETHING_WENT_WRONG";

  return res.json({
    accountHolder: verifyAccount?.accountHolder,
    getWithDrawlDetails:
      getWithDrawlDetails?.length === 0
        ? constantUtils?.NO_TRANSACTIONS
        : getWithDrawlDetails,
  });
});

controller.getDepositeDetails = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";
  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  const getDepositeDetails = await Deposite.findAll({
    where: {
      accountNumber: verifyAccount?.accountNumber,
    },
    offset: req?.body?.offset ?? 0,
    limit: req?.body?.limit ?? 25,
  });
  if (!getDepositeDetails) throw "SOMETHING_WENT_WRONG";

  return res.json({
    accountHolder: verifyAccount?.accountHolder,
    getDepositeDetails:
      getDepositeDetails?.length === 0
        ? constantUtils?.NO_TRANSACTIONS
        : getDepositeDetails,
  });
});

controller.loanApply = handler(async (req, res) => {
  if (!req?.body?.accountNumber) throw "ACCOUNT_NUMBER_REQUIRED";
  if (!req?.body?.loanApply) throw "INVAILD_LOAN_APPLY";
  const verifyAccount = await Accounts.findOne({
    where: {
      accountNumber: req?.body?.accountNumber,
    },
  });
  if (!verifyAccount) throw "INVAILD_ACCOUNT_ID";

  const verifyLoan = await LoanApply.findOne({
    where: {
      accountNumber: verifyAccount?.accountNumber,
    },
  });
  if (verifyLoan) throw "ALREDY_YOU_APPLIED_FOR_LOAN";

  const loanApply = await LoanApply.create({
    accountNumber: verifyAccount?.accountNumber,
    loanApply: req?.body?.loanApply,
    date: new Date(),
  });

  if (!loanApply) throw "SOMETHING_WENT_WRONG";
  return res.json({ messgae: "your loan applied" });
});

module.exports = controller;
