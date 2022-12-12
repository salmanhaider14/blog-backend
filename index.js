const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb://salmanhaider:nullreference404@ac-sdlmvwf-shard-00-00.zaah12c.mongodb.net:27017,ac-sdlmvwf-shard-00-01.zaah12c.mongodb.net:27017,ac-sdlmvwf-shard-00-02.zaah12c.mongodb.net:27017/?ssl=true&replicaSet=atlas-fiu6gf-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const db = mongoose.connection;
app.use(cors());

db.on("error", (error) => console.log(error)); //checking if it throws any error
db.once("open", () => {
  console.log("Connected To Database");
});

const blogrouters = require("./routes/blogs");
app.post("/images", upload.single("image"), (req, res) => {
  if (!req.file) res.status(500).send("Err");
  else res.status(200).send("Image Upload Success");
});

app.use("/blogs", blogrouters);

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is running dude")
);
