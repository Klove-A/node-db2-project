Car = require("./cars-model");

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
  next();
};

const checkVinNumberUnique = (req, res, next) => {
  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
