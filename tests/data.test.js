const request = require("supertest");
const app = require("../server");

describe("Data API", () => {
  let testData;

  beforeEach(() => {
    testData = [
      {
        id: "1",
        name: "Kamal Rawal",
        age: "28",
        email: "obviouslykamal@gmail.com",
        location: "New Delhi",
      },
    ];
  });

  test("GET /api/data should return all data", async () => {
    await request(app).post("/api/data").send(testData[0]);
    const response = await request(app).get("/api/data");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(testData));
  });

  test("POST /api/data should create a new data entry", async () => {
    const newData = {
      id: "2",
      name: "New Value 1",
      age: "New Value 2",
      email: "New Value 3",
      location: "New Value 4",
    };

    const response = await request(app).post("/api/data").send(newData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newData);

    const getDataResponse = await request(app).get("/api/data");
    expect(getDataResponse.body).toEqual(
      expect.arrayContaining([...testData, newData])
    );
  });

  test("PUT /api/data/:id should update an existing data entry", async () => {
    const updatedData = { name: "Updated Value 1" };
    const putResponse = await request(app).put(`/api/data/1`).send(updatedData);

    expect(putResponse.status).toBe(200);
    expect(putResponse.body).toEqual({ ...testData[0], ...updatedData });

    const getDataResponse = await request(app).get("/api/data");
    expect(getDataResponse.body).toEqual(
      expect.arrayContaining([{ ...testData[0], ...updatedData }])
    );
  });

  test("DELETE /api/data/:id should delete an existing data entry", async () => {
    const deleteResponse = await request(app).delete(`/api/data/1`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({
      message: "Data deleted successfully",
    });

    const getDataResponse = await request(app).get("/api/data");
    expect(getDataResponse.body).not.toEqual(
      expect.arrayContaining([testData[0]])
    );
  });
});
