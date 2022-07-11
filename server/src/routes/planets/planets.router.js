const express = require("express");

const { getAllPlanets } = require("./planet.controller");

const planetRouter = express.Router();

planetRouter.get("/planets", getAllPlanets);

module.exports = planetRouter;
