const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  dname: {
    type: String,
    required: true,
  },
  demail: {
    type: String,
    required: true,
  },
  dmobile: {
    type: Number,
    required: true,
  },
  doccupation: {
    type: String,
    required: true,
  },
  dpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

doctorSchema.methods.generateAuthToken = async function () {
  const secreteKey = "hellopawanthisissecretekeyokkkk";
  try {
    let dtoken = jwt.sign({ _id: this._id }, secreteKey);
    this.tokens = this.tokens.concat({ token: dtoken });
    await this.save();
    return dtoken;
  } catch (err) {
    console.log("token not generated");
  }
};

const Docter = mongoose.model("Docter", doctorSchema);

module.exports = Docter;
