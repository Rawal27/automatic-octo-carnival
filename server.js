const express = require("express");
const csv = require("csv-parser");
const cors = require("cors");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const app = express();

app.use(cors());

app.use(express.json());
const dataFilePath = "./data/data.csv";

// Helper function to read the CSV file
const readDataFile = () => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(dataFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Helper function to write the CSV file
const writeFileData = (dataArray) => {
  return new Promise(async (resolve) => {
    const csvWriter = await createCsvWriter({
      path: dataFilePath,
      header: [
        { id: "id", title: "id" },
        { id: "name", title: "name" },
        { id: "age", title: "age" },
        { id: "email", title: "email" },
        { id: "location", title: "location" },
      ],
    });
    await csvWriter.writeRecords(dataArray);
    resolve("Success");
  });
};

// REST API for retrieving all data
app.get("/api/data", async (req, res) => {
  try {
    const data = await readDataFile();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// REST API for creating a new data entry
app.post("/api/data", async (req, res) => {
  try {
    const data = req.body;
    const dataArray = await readDataFile();
    dataArray.push(data);
    await writeFileData(dataArray);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: `Failed to create data - ${error}` });
  }
});

// REST API for updating an existing data entry
app.put("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const data = await readDataFile();
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
      data[index] = { ...data[index], ...updatedData };
      await writeFileData(data);
      res.status(200).json(data[index]);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to update data - ${error}` });
  }
});

// REST API for deleting a data entry
app.delete("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readDataFile();
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
      data.splice(index, 1);
      await writeFileData(data);
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to delete data - ${error}` });
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ data: "Welcome to CSV CRUD Application." });
});

//Default port listening for app
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;
