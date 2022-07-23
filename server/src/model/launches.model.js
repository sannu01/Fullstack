const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explore Is1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

async function existLaunchId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}
async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}
async function getAllLaunchesData() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunchesData(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });

  return await saveLaunchesData(newLaunch);
}

async function deleteLaunchData(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.acknowledged && aborted.matchedCount === 1;
}
module.exports = {
  getAllLaunchesData,
  scheduleNewLaunch,
  existLaunchId,
  deleteLaunchData,
};
