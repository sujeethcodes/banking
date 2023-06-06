const express = require("express");
const cors = require("cors");
const db = require("./model/index");
const app = express();

app.use(cors("*"));
app.use(express.json({ limit: "10000000mb" }));
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use("/api", require("./router"));
const PORT = process.env.PORT ?? 6000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING, ${PORT}`);
});
