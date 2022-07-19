const request = require("supertest");

const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const launchData = {
    mission: "USS Enterprises",
    rocket: "NCC 1701",
    target: "Kepler-134",
    launchDate: "january 23,2345",
  };
  const launchDateWithoutDate = {
    mission: "USS Enterprises",
    rocket: "NCC 1701",
    target: "Kepler-134",
  };
  const launchDataWithInvalidDate = {
    mission: "USS Enterprises",
    rocket: "NCC 1701",
    target: "Kepler-134",
    launchDate: "january",
  };
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchData)
      .expect("Content-type", /json/)
      .expect(201);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDateWithoutDate);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDateWithoutDate)
      .expect("Content-type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "Missing required Data" });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "Invalid launch date" });
  });
});
