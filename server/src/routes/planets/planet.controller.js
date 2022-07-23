const { getAllPlanetsData } = require("../../model/planets.model");

async function getAllPlanets(req, res) {
  return res.status(200).send(await getAllPlanetsData());
}

module.exports = {
  getAllPlanets,
};
