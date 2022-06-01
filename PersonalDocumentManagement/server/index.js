const connection = require("express");
const bodyparser = require("body-parser");
const app = connection();
const port = 8000;
const Cloudant = require("@cloudant/cloudant");
var url =
  "https://2fbcb9ec-d57d-431a-8d72-186d88ddf478-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-kf8ex4frj52lu2wwin72qqktpi3occ9bfv4p80vbr99";
var password = "68fc5b9dc8c58071087abaecc44a5f29";
var Documents = {};
const file = require("fs");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
const { response } = require("express");
var urlParser = bodyparser.urlencoded({ extended: false });
app.use(connection.static("public"));
app.get("/dashboard", function (request, response) {
  response.json({ name: "Lakshmana pandian" });
});
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on http://localhost:${port}`);
});
var cloudant = Cloudant({ url: url, username: username, password: password });
cloudant
  .use("document_management")
  .insert({ name: ";Lakshmanapandian", id: "100" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
