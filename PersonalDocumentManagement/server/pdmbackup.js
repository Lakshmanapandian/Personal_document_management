// const express = require("express");
const fs = require("fs");
const connection = require("express");
const signupcontoller = require("./controller/signupcontroller");
const bodyparser = require("body-parser");
const multer = require("multer");
const app = connection();
const winlogger = require("./logger/logger");
const Cloudant = require("@cloudant/cloudant");
var url =
  "https://2fbcb9ec-d57d-431a-8d72-186d88ddf478-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-kf8ex4frj52lu2wwin72qqktpi3occ9bfv4p80vbr99";
var password = "68fc5b9dc8c58071087abaecc44a5f29";
var cloudant = Cloudant({ url: url, username: username, password: password });
const path = require("path");
const downloadPackage = require("download");
const port = 8000;
const cors = require("cors");
const dbconnection = require("./db");
const { request } = require("http");
const e = require("express");
const { response } = require("express");
// // app.use(express.static("public"));
app.use(connection.static("public"));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
var urlParser = bodyparser.urlencoded({ extended: false });
// app.get("/", function (request, response) {
//   var data = file.readFileSync("details.json");

//   var details = JSON.parse(data);
//   console.log("From get functin", details);
//   exports.dataset = details;

//   //   response.sendFile(`${__dirname}/`);
// });

app.post("/dashboard", (request, response) => {
  console.log(request);
  var object = {
    username: request.body.username,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
    confirm_password: request.body.confirm_password,
    type: "user",
  };
  dbconnection.insert(object);
  console.log("Data added");
});
app.get("/getUser", (request, response) => {
  console.log(request);
  var data = {
    selector: {
      type: "user",
    },
  };
  dbconnection.get(data, "document_management").then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });
});

app.get("/getUserId/:id", (request, response) => {
  dbconnection.getId(request.params.id, "document_management").then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});
app.delete("/delete_items/:id/:id1", (request, response) => {
  dbconnection
    .delete_items(request.params.id, request.params.id1, "document_management")
    .then((res) => {
      if (res) {
        response.send(res);
      } else {
        response.send("error");
      }
    });
});
app.get("/getAdminId", (request, response) => {
  console.log(request);
  console.log("fetching Admin Details");
  var data = {
    selector: {
      type: "admin",
    },
  };
  dbconnection.get(data, "document_management").then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });
});
app.get("/getAdminId/:id", (request, response) => {
  dbconnection.getId(request.params.id, "document_management").then((res) => {
    if (res) {
      response.send(res);
    } else {
      response.send("error");
    }
  });
});
// __________________________________________________________________________
// app.post("/single", (req, res) => {
//   // var originalname = "";
//   // let title = req.body.title;
//   // console.log(title);

//   var store = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, `./${username}` );
//     },
//     filename: function (req, file, cb) {
//       originalname = file.originalname;
//       cb(null, originalname);
//       console.log(originalname + " uploaded");
//     },
//   });

//   var upload = multer({ storage: store }).single("image");

//   upload(req, res, function (err) {
//     if (err) {
//       res.send({ status: 500, error: "Unable to process your request!" });
//     } else {
//       res.send({ status: 200, error: "Success!", originalname: originalname });
//     }
//   });
// });
// ______________________________________________________________
// "\\public\\Uploads\\"
app.post("/username", (request, response) => {
  username = request.body.username;
  if (fs.existsSync(username)) {
    console.log("file already exits");
  } else {
    fs.mkdirSync(username);
    console.log(`${username} folder created`);
  }
  app.post("/single", (req, res) => {
    var store = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(username);
        cb(null, `./${username}`);
      },
      filename: function (req, file, cb) {
        originalname = file.originalname;
        console.log(originalname);
        pathtype = file.mimetype;
        cb(null, originalname, pathtype);
        console.log(originalname + " uploaded");
        var fileDetails = {
          file_name: originalname,
          file_type: pathtype,
          user_id: username,
          filepath: path.join(__dirname, `${username}`),
          type: "files",
        };
        dbconnection.insert(fileDetails);
      },
    });
    var upload = multer({ storage: store }).single("image");

    upload(req, res, function (err) {
      if (err) {
        res.send({ status: 500, error: "Unable to process your request!" });
      } else {
        res.send({
          status: 200,
          error: "Success!",
          originalname: originalname,
        });
      }
    });
  });
});
// app.post("/single", (req, res) => {
//   var store = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log(username);
//       cb(null, `./${username}`);
//     },
//     filename: function (req, file, cb) {
//       originalname = file.originalname;
//       console.log(originalname);
//       pathtype = file.mimetype;
//       cb(null, originalname, pathtype);
//       console.log(originalname + " uploaded");
//       // var fileDetails = {
//       //   file_name: originalname,
//       //   file_type: pathtype,
//       //   user_id: username,
//       // };
//       // console.log(fileDetails);
//     },
//   });
//   var upload = multer({ storage: store }).single("image");

//   upload(req, res, function (err) {
//     if (err) {
//       res.send({ status: 500, error: "Unable to process your request!" });
//     } else {
//       res.send({
//         status: 200,
//         error: "Success!",
//         // originalname: originalname,
//       });
//     }
//   });
// });
app.post("/userfiles", (request, response) => {
  username = request.body.username;
  console.log(username);
  var data = {
    selector: {
      user_id: username,
    },
  };
  dbconnection.get(data, "document_management").then((res) => {
    if (res) {
      console.log(res);
      response.send(res);
    } else {
      response.send("error");
    }
  });

  // const dirpath = path.join(__dirname, `${username}`);
  // fs.readdir(dirpath, (err, files) => {
  //   response.json(files);
  // });
});
app.post("/download", (request, response) => {
  var path = request.body.filepath;
  downloadFilename = request.body.filename;
  console.log(path);
  console.log(downloadFilename);
  const filess = `${path}\\${downloadFilename}`;
  console.log(filess);
  response.download(filess);
  // const dirpath = path.join(__dirname, `${path}`,${downloadFilename});
  // var filestream = fs.createReadStream(file);
  // filestream.pipe(res);
});
app.post("/localdelete", (request, response) => {
  var path = request.body.filepath;
  deleteFilename = request.body.filename;
  // console.log(path);
  console.log(deleteFilename);
  const filess = `${path}\\${deleteFilename}`;
  console.log(filess);
  // console.log(filess);
  fs.unlinkSync(filess);
  console.log(`${deleteFilename} deleted`);
});
app.post("/localrename", (request, response) => {
  var oldpath = request.body.oldpath;
  var oldfilename = request.body.oldfilename;
  var _id = request.body._id;
  var extension = oldfilename.split(".");
  ext = extension[1];
  console.log(ext);
  console.log(oldfilename);
  var newpath = request.body.newpath;
  var oldname = oldpath + "\\" + oldfilename;
  var newname = oldpath + "\\" + newpath + "." + ext;
  console.log(newname);
  fs.rename(oldname, newname, () => {
    console.log("file renamed successfully");
  });
  const newData = { file_name: newpath + "." + ext };

  cloudant
    .use("document_management")
    .find({ selector: { _id: _id } }, (err, documents) => {
      var revision = documents.docs[0]._rev;
      const data = { ...documents.docs[0], ...newData };

      cloudant
        .use("document_management")
        .insert(data, { _rev: revision }, function (err) {
          if (!err) {
            console.log(`${oldfilename} renamed as  ${newpath}.${ext}`);
          } else {
            console.log("failure", err);
          }
        });
    });
});
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  winlogger.info("SUCCESS", "Server is running!!!");
  console.log(`server is listening on http://localhost:${port}`);
});
