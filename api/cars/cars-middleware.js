Car = require("./cars-model");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const car = await Car.getAll(id);
    if (!car) {
      next({status: 404, message: `car with id ${id} is not found`})
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
};

