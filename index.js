var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
const upload = multer({
  dest: "./public/data/uploads/"
});

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req?.file);
  res.json({
    name: Buffer.from(req?.file?.originalname, 'latin1').toString('utf8'),
    type: req?.file?.mimetype,
    size: req?.file?.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
