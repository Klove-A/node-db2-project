const express = require("express");
const router = express.Router();
const Cars = require("./cars-model");
const { checkCarId } = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    console.log("post car");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
