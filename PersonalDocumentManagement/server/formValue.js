const express = require("express");
const connection = require("express");
const bodyparser = require("body-parser");
const app = connection();
const upload = require();
app.use(express.static("public"));
const port = 8000;
var login = {};
const file = require("fs");
const { request } = require("http");
const { response } = require("express");
const { nextTick } = require("process");
const cors = require("cors");
const dbconnection = require("./db");
// app.use(express.static("public"));
app.use(connection.static("public"));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
// var urlParser = bodyparser.urlencoded({ extended: false });
// app.get("/", function (request, response) {
//   var data = file.readFileSync("details.json");

//   var details = JSON.parse(data);
//   console.log("From get functin", details);
//   exports.dataset = details;

//   //   response.sendFile(`${__dirname}/`);
// });

// app.post("/dashboard", (request, response, next) => {
//   console.log(request);
//   var object = {
//     username: request.body.username,
//     first_name: request.body.first_name,
//     last_name: request.body.last_name,
//     email: request.body.email,
//     password: request.body.password,
//     confirm_password: request.body.confirm_password,
//   };

//   var data = file.readFileSync("details.json");

//   var details = JSON.parse(data);
//   details.push(object);
//   console.log(details);

//   file.writeFile("details.json", JSON.stringify(details), (err) => {
//     if (err) throw err;

//     console.log("Data added successfully");
//     details = JSON.parse(data);
//   });
// response.end(JSON.stringify(patient));
//   dbconnection.insert(object);
//   response.redirect("..");
//   console.log("Data added");
// });
// app.get("/getUser", (request, response) => {
//   console.log(request);
//   console.log("Fetching Begins");
//   dbconnection.get("document_management").then((res) => {
//     if (res) {
//       response.send(res);
//     } else {
//       response.send("error");
//     }
//   });
// });
// app.get("/getUserId/:id", (request, response) => {
//   dbconnection.getId(request.params.id, "document_management").then((res) => {
//     if (res) {
//       response.send(res);
//     } else {
//       response.send("error");
//     }
//   });
// });
// app.delete("/delete/:id/:id1", (request, response) => {
//   dbconnection
//     .del_id(request.params.id, request.params.id1, "freshers_sample")
//     .then((res) => {
//       if (res) {
//         response.send(rnodes);
//       } else {
//         response.send("error");
//       }
//     });
// });

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on http://localhost:${port}`);
});
