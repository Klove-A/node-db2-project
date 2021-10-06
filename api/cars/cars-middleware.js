Car = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car id not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // How I wanted to write it dry and clean!
  const error = { status: 400 };
  if (!req.body.vin) {
    error.message = "vin is missing";
  } else if (!req.body.make) {
    error.message = "make is missing";
  } else if (!req.body.model) {
    error.message = "model is missing";
  } else if (!req.body.mileage) {
    error.message = "mileage is missing";
  }
  if (error.message) {
    next(error);
  } else {
    next();
  }
  // Gabe's way
  // if (!req.body.vin) return next({
  //   status: 400,
  //   message: "vin is missing",
  // });
  // if (!req.body.make) return next({
  //   status: 400,
  //   message: "make is missing",
  // });
  // if (!req.body.model) return next({
  //   status: 400,
  //   message: "model is missing",
  // });
  // if (!req.body.mileage) return next({
  //   status: 400,
  //   message: "mileage is missing",
  // });
  // next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const carVin = await Car.getByVin(vin);
    if (!carVin) {
      next();
    } else {
      next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
