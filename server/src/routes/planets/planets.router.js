const express = require("express");

const { getAllPlanets } = require("./planet.controller");

const planetRouter = express.Router();

planetRouter.get("/", getAllPlanets);

module.exports = planetRouter;
