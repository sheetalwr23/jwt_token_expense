const User_model = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Athorization");
    console.log(token, "token>>>>>>>>>>>>>>>>>>>>>>>>>");
    const decodedToken = jwt.verify(token, "sheetalkey");
    console.log(decodedToken, "this is jwt token and its key");
    User_model.findByPk(decodedToken.userId)
      .then((result) => {
        console.log("user>>>>>", decodedToken);
        console.log(JSON.stringify(decodedToken));
        req.user = decodedToken;
        next();
      })

      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log("error" + err);
    return res.status(401).json({ success: "fail" });
  }
};
module.exports = {
  authenticate: authenticate,
};
