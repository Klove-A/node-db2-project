exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert([
    {
      vin: "1N4AL3AP4EC445507",
      make: "test-make-1",
      model: "test-model-1",
      mileage: 123,
    },
    {
      vin: "1M2P267CXTM064650",
      make: "test-make-2",
      model: "test-model-2",
      mileage: 123,
    },
  ]);
};
