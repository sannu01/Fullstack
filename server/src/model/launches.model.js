const launches = new Map();
let latestFlightNumber = 100;
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

launches.set(launch.flightNumber, launch);

function existLaunchId(launchId) {
  return launches.has(launchId);
}
function addNewLaunchData(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function getAllLaunchesData() {
  return Array.from(launches.values());
}

function deleteLaunchData(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}
module.exports = {
  getAllLaunchesData,
  addNewLaunchData,
  existLaunchId,
  deleteLaunchData,
};
