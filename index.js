const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/ninjago");
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is listening in Port 3002...`);
});
