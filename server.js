const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const budgetModel = require("./budgetSchema.js");

let url = "mongodb://localhost:27017/budgetDB";

// Connect to database containing budget data
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");

    app.get("/budget", async (req, res) => {
      budgetModel
        .find({})
        .then(data => {
          console.log("Fetched data:", data);
          res.json(data);
          // mongoose.connection.close();
        })
        .catch(connectionError => {
          console.log(connectionError);
        });
    });
  })
  .catch(connectionError => {
    console.log(connectionError);
  });

app.use("/", express.static("public"));
app.use(express.json());

app.post("/budget", async (req, res) => {
  const { title, budget, color } = req.body;

  const budgetEntry = new budgetModel({
    title,
    budget,
    color
  });

  budgetEntry
    .save()
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(connectionError => {
      console.log(connectionError);
      res.status(500).send("Error saving data");
    });
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
