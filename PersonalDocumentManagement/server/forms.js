// const express = require("express");
const fs = require("fs");
const connection = require("express");
const signupcontroller = require("./controller/signupcontroller");
const admincontroller = require("./controller/admincontroller");
const uploadcontroller = require("./controller/uploadcontroller");
const renamecontroller = require("./controller/renamecontroller");
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
const logger = require("./logger/logger");
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
  // console.log(request);
  var object = {
    username: request.body.username,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
    confirm_password: request.body.confirm_password,
    type: "user",
  };
  signupcontroller
    .SignupForm(object)
    .then((res) => {
      logger.info("Signup form added");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error ");
      response.send(err, "Faild to upload");
    });
  console.log("Data added");
});
app.get("/getUser", (request, response) => {
  // console.log(request);
  var data = {
    selector: {
      type: "user",
    },
  };
  signupcontroller
    .getusers(data)
    .then((res) => {
      // console.log(res);
      logger.info(" Login - user data successfully fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error");
      response.send(err, " login Faild  to get");
    });
});

// app.get("/getUserId/:id", (request, response) => {
//   dbconnection.getId(request.params.id, "document_management").then((res) => {
//     if (res) {
//       response.send(res);
//     } else {
//       response.send("error");
//     }
//   });
// });
app.delete("/delete_items/:id/:id1", (request, response) => {
  admincontroller
    .deleteuser(request.params.id, request.params.id1)
    .then((res) => {
      logger.info(" Delete Admin users - user data successfully deleted");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error");
      response.send(err, " login Faild  to get");
    });
});
app.get("/getAdminId", (request, response) => {
  // console.log(request);
  logger.info("fetching Admin Details");
  var data = {
    selector: {
      type: "admin",
    },
  };
  admincontroller
    .getadmin(data)
    .then((res) => {
      // console.log(res);
      logger.info(" AdminLogin - Admin data successfully fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error");
      response.send(err, " adminlogin Failed  to get");
    });
});
// app.get("/getAdminId/:id", (request, response) => {
//   dbconnection.getId(request.params.id, "document_management").then((res) => {
//     if (res) {
//       response.send(res);
//     } else {
//       response.send("error");
//     }
//   });
// });
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
// app.get("/test", (request, response) => {
//   console.log( "name"));
// });
app.post("/username", (request, response) => {
  username = request.body.username;
  if (fs.existsSync(path.join(__dirname, "public/Uploads", username))) {
    // console.log("folder  already exits");
    logger.info("Folder already exist");
  } else {
    fs.mkdirSync(path.join(__dirname, "public/Uploads", username));
    logger.info(`${username} folder created`);
  }
  app.post("/single", (req, res) => {
    var store = multer.diskStorage({
      destination: function (req, file, cb) {
        // console.log(username);
        cb(null, path.join(__dirname, "public/Uploads", username));
      },
      filename: function (req, file, cb) {
        originalname = file.originalname;
        // console.log(originalname);
        pathtype = file.mimetype;
        cb(null, originalname, pathtype);
        logger.info(originalname + " uploaded");
        var fileDetails = {
          file_name: originalname,
          file_type: pathtype,
          user_id: username,
          filepath: path.join(__dirname, "public/Uploads", `${username}`),
          type: "files",
        };
        uploadcontroller
          .UploadForm(fileDetails)
          .then((res) => {
            logger.info("Uploaded successfully");
            response.send(res);
          })
          .catch((err) => {
            logger.warn("error ");
            response.send(err, "Faild to upload");
          });
        // console.log("Data added");
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
  // console.log(username);
  var data = {
    selector: {
      user_id: username,
    },
  };
  uploadcontroller
    .showDocuments(data)
    .then((res) => {
      // console.log(res);
      logger.info(" Document show -  data successfully fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error");
      response.send(err, " Document  Failed  to get");
    });
});

// const dirpath = path.join(__dirname, `${username}`);
// fs.readdir(dirpath, (err, files) => {
//   response.json(files);
// });
app.post("/download", (request, response) => {
  var path = request.body.filepath;
  downloadFilename = request.body.filename;
  // console.log(path);
  // console.log(downloadFilename);
  const filess = `${path}\\${downloadFilename}`;
  // console.log(filess);
  response.download(filess);
  // const dirpath = path.join(__dirname, `${path}`,${downloadFilename});
  // var filestream = fs.createReadStream(file);
  // filestream.pipe(res);
});
app.post("/localdelete", (request, response) => {
  var path = request.body.filepath;
  deleteFilename = request.body.filename;
  // console.log(path);
  // console.log(deleteFilename);
  const filess = `${path}\\${deleteFilename}`;
  // console.log(filess);
  // console.log(filess);
  fs.unlinkSync(filess);
  logger.info(`${deleteFilename} deleted`);
});
app.post("/localrename", (request, response) => {
  var oldpath = request.body.oldfilepath;
  var oldfilename = request.body.oldfilename;
  var _id = request.body._id;
  var extension = oldfilename.split(".");
  ext = extension[1];
  var newpath = request.body.newpath;
  var oldname = oldpath + "\\" + oldfilename;
  var newname = oldpath + "\\" + newpath + "." + ext;
  // console.log(oldname);
  // console.log(newname);
  fs.rename(oldname, newname, () => {
    logger.info("file renamed successfully");
  });
  const newfilename = newpath + "." + ext;
  var newobject = {
    _id: request.body.oldid,
    _rev: request.body.oldrev,
    file_name: newfilename,
    file_type: request.body.oldtype,
    user_id: request.body.olduserid,
    filepath: request.body.oldfilepath,
    type: request.body.type,
  };
  // console.log(newobject);
  renamecontroller
    .renameDocuments(newobject)
    .then((res) => {
      // console.log(res);
      logger.info(" Document rename -  data successfully fetched");
      response.send(res);
    })
    .catch((err) => {
      logger.warn("error");
      response.send(err, " Document  Failed  to rename");
    });
  // cloudant
  //   .use("document_management")
  //   .find({ selector: { _id: _id } }, (err, documents) => {
  //     var revision = documents.docs[0]._rev;
  //     const data = { ...documents.docs[0], ...newData };
  //     cloudant
  //       .use("document_management")
  //       .insert(data, { _rev: revision }, function (err) {
  //         if (!err) {
  //           console.log(`${oldfilename} renamed as  ${newpath}.${ext}`);
  //         } else {
  //           console.log("failure", err);
  //         }
  //       });
  //   });
});
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  winlogger.info("SUCCESS", "Server is running!!!");
  console.log(`server is listening on http://localhost:${port}`);
});
