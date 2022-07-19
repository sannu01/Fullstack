const {
  getAllLaunchesData,
  addNewLaunchData,
  existLaunchId,
  deleteLaunchData,
} = require("../../model/launches.model");

function getAllLaunches(req, res) {
  res.status(200).json(getAllLaunchesData());
}

function addNewLaunch(req, res) {
  let launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required Data" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunchData(launch);

  return res.status(201).json(launch);
}

function deleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existLaunchId(launchId)) {
    return res.status(404).json({
      error: "Launch not Found",
    });
  }

  const aborted = deleteLaunchData(launchId);
  return res.status(200).json(aborted);
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
};
