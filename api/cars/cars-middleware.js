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
  const error = { status: 400 };
  if (!req.body.vin) {
    error.message = "vin is required";
  } else if (!req.body.make) {
    error.message = "make is required";
  } else if (!req.body.model) {
    error.message = "model is required";
  } else if (!req.body.mileage) {
    error.message = "mileage is required";
  }
  if (error.message) {
    next(error);
  } else {
    next();
  }
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
    const carVin = await Car.getByVin(vin) 
    if (!carVin) {
      next()
    } else {
      next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
    }
  } catch (err) {
    next (err)
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
