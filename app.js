const express = require("express");
const app = express();
const sequelize = require("sequelize");
const path = require("path");
const sequelize_db = require("./util/expense");
const user = require("./models/user");
const Expense = require("./models/expense");
const bodyParser = require("body-parser");
const router = require("./routes/user");
const controller = require("./controller/user");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const sign_up = require("./models/user");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

user.hasMany(Expense);
Expense.belongsTo(user);

sequelize_db
  .sync({ force: true })
  .then(() => {
    app.listen(3000);
    console.log("listening to port 3000");
    console.log("Table created");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });
