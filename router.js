const express = require("express");
const accounts = require("./routes/accounts.routes");
const banking = require("./routes/bank.routes");
const router = express.Router();

router.use("/accounts", accounts);
router.use("/bank", banking);
module.exports = router;
