const express = require("express");
const doctorRouter = express.Router();
const { Doctor } = require("../model/doctor.model");
require("dotenv").config();
doctorRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const newdoctor = new Doctor(req.body);
    await newdoctor.save();
    console.log(newdoctor);
    res.status(200).send({ msg: "New doctor Created" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ Error: error.message });
  }
});

doctorRouter.get("/getAll", async (req, res) => {
  try {
    const finddoctor = await Doctor.find();

    return res.status(200).send({ msg: finddoctor });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});

doctorRouter.get("/sortBySpecialization", async (req, res) => {
  try {
    const Specialization = req.query.specialization;
    const finddoctor = await Doctor.find({ specialization: Specialization });

    return res.status(200).send({ msg: finddoctor });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});
doctorRouter.post("/sortByDate", async (req, res) => {
  try {
    const date = req.body.date;
    const finddoctor = await Doctor.find({ date: date });

    return res.status(200).send({ msg: finddoctor });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});
doctorRouter.post("/searchByDrName", async (req, res) => {
  try {
    const name = req.body.name;
    const finddoctor = await Doctor.find({ name: name });

    return res.status(200).send({ msg: finddoctor });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});
doctorRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.findByIdAndUpdate(id, req.body);

    return res.status(200).send({ msg: "Doctor details is updated" });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});

doctorRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.findByIdAndDelete(id);

    return res.status(200).send({ msg: "Doctor details is updated" });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});
module.exports = { doctorRouter };
