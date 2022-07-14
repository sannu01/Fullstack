const { habitablePlanets } = require("../../model/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).send(habitablePlanets);
}

module.exports = {
  getAllPlanets,
};
