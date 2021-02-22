const express = require("express");
let cors = require("cors");

const locationsroute = require("./routes/locationsroute.js");
const crudRepository = require("./database/crudrepository.js");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/locations", locationsroute);

// TODO Server close

const server = app.listen(port, async () => {
  try {
    let hr = await crudRepository.connect();
    console.log(
      "server started, database connection open and tables created or read."
    );
  } catch (err) {
    console.log(err);
  }
});
