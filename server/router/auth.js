const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/conn");
const Docter = require("../model/docterSchema");
const Patient = require("../model/patientSchema");

// docter reg
router.post("/dregister", async (req, res) => {
  const { dname, demail, dmobile, doccupation, dpassword } = req.body;

  if (!dname || !demail || !dmobile || !doccupation || !dpassword) {
    return res.status(422).json({ errror: "please fill all the fields" });
  }

  try {
    const DoctorExist = await Docter.findOne({ dmobile: dmobile });
    if (DoctorExist) {
      return res.status(422).json({ errror: "mobile no. already exists" });
    }

    const docter = new Docter({
      dname,
      demail,
      dmobile,
      doccupation,
      dpassword,
    });

    const salt = await bcrypt.genSalt(12);
    docter.dpassword = await bcrypt.hash(docter.dpassword, salt);

    await docter.save();
    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log("something went wront", err);
  }
});

router.post("/dlogin", async (req, res) => {
  const { dmobile, dpassword } = req.body;

  if (!dmobile || !dpassword) {
    return res
      .status(422)
      .json({ error: "please fill your mobile no and password" });
  }
  try {
    const foundDoctor = await Docter.findOne({
      dmobile: dmobile,
    });

    const validPassword = await bcrypt.compare(
      dpassword,
      foundDoctor.dpassword
    );

    const dtoken = await foundDoctor.generateAuthToken();
    // console.log(dtoken);
    res.cookie("dtoken", dtoken, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (validPassword) {
      console.log("login successfully");
      res.status(200).json({ message: "Valid Password" });
    } else {
      console.log("mobile or passsword is wrong");
      res.status(400).json({ error: "user not found" });
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
});

router.post("/plogin", async (req, res) => {
  const { pmobile, ppassword } = req.body;

  if (!pmobile || !ppassword) {
    return res
      .status(422)
      .json({ error: "please fill your mobile no and password" });
  }
  try {
    const foundPatient = await Patient.findOne({
      pmobile: pmobile,
    });

    const validPassword = await bcrypt.compare(
      ppassword,
      foundPatient.ppassword
    );

    const ptoken = await foundPatient.generateAuthToken();
    // console.log(dtoken);
    res.cookie("ptoken", ptoken, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (validPassword) {
      console.log("login successfully");
      res.status(200).json({ message: "Valid Password" });
    } else {
      console.log("mobile or passsword is wrong");
      res.status(400).json({ error: "user not found" });
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
});

router.post("/pregister", async (req, res) => {
  const { pname, pemail, pmobile, pseekness, ppassword, pcpassword } = req.body;

  if (
    !pname ||
    !pemail ||
    !pmobile ||
    !pseekness ||
    !ppassword ||
    !pcpassword
  ) {
    return res.status(422).json({ errror: "please fill all the fields" });
  }
  try {
    const PatientExist = await Patient.findOne({ pmobile: pmobile });
    if (PatientExist) {
      return res.status(422).json({ errror: "mobile no. already exists" });
    }

    const patient = new Patient({
      pname,
      pemail,
      pmobile,
      pseekness,
      ppassword,
    });

    const salt = await bcrypt.genSalt(12);
    patient.ppassword = await bcrypt.hash(patient.ppassword, salt);

    await patient.save();
    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log("something went wront", err);
  }
});

router.get("/docterList", authenticate, (req, res) => {
  console.log("gettting docters");
  res.send("find docoter for me ffast");
});

router.get("patientList", authenticate, (req, res) => {
  res.send("find patients");
});

module.exports = router;
