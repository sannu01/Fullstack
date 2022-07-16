const { getAllPlanetsData } = require("../../model/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).send(getAllPlanetsData());
}

module.exports = {
  getAllPlanets,
};
