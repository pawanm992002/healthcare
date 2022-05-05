const jwt = require("jsonwebtoken");
import Docter from "../model/docterSchema";
import Patient from "../model/patientSchema";

const authenticate = async (req, res, next) => {
  try {
    const secreteKey = "hellopawanthisissecretekeyokkkk";
    const dtoken = req.cookies.dtoken;
    const verifyDocter = jwt.verify(dtoken, secreteKey);
    const rootDocter = await Docter.findOne({
      _id: verifyDocter._id,
      "tokens:token": dtoken,
    });
    if (!rootDocter) {
      throw new Error("docter not login or registered");
    }
    req.token = dtoken;
    req.rootDocter = rootDocter;
    req.Do;
  } catch (err) {
    res.status(401).send("Unauthorized: no token found");
  }
};

module.exports = authenticate;
