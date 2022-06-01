const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
var fs = require("fs");
var path = require("path");
const multer = require("multer");
app.use(express.static(__dirname + "/public/"));
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.post("/single", (req, res) => {
  // var originalname = "";
  // let title = req.body.title;
  // console.log(title);

  var store = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/Uploads");
    },
    filename: function (req, file, cb) {
      originalname = file.originalname;
      cb(null, originalname);
      console.log(originalname + " uploaded");
    },
  });

  var upload = multer({ storage: store }).single("image");

  upload(req, res, function (err) {
    if (err) {
      res.send({ status: 500, error: "Unable to process your request!" });
    } else {
      res.send({ status: 200, error: "Success!", originalname: originalname });
    }
  });
});
// var username = "priya";
// const dirname = path.join(__dirname, `${username}`);
// console.log(dirname);
// fs.readdir(dirname, (err, files) => {
//   console.log(files);
// });
app.listen(3000);
