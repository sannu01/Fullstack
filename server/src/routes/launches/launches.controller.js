const {
  getAllLaunchesData,
  scheduleNewLaunch,
  existLaunchId,
  deleteLaunchData,
} = require("../../model/launches.model");

async function getAllLaunches(req, res) {
  res.status(200).json(await getAllLaunchesData());
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
  scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function deleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existLaunch = await existLaunchId(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "Launch not Found",
    });
  }

  const aborted = await deleteLaunchData(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
};
