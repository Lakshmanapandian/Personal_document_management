const my_db = require("../db");
const logger = require("../logger/logger");

var SignupForm = async (object) => {
  try {
    var val = await my_db
      .add(object, "document_management")
      .then((data) => {
        logger.info("Your Data was posted sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error");
  }
  return val;
};

var getusers = async (obj) => {
  try {
    var val = await my_db
      .getalluser(obj, "document_management")
      .then((data) => {
        logger.info("Your get was fetched sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error  from login");
  }
  return val;
};
var deleteuser = async (id, rev) => {
  try {
    var val = await my_db
      .deleteuser(id, rev, "document_management")
      .then((data) => {
        logger.info("Your get was fetched sucessfully!!!");
        return data;
      })
      .catch((err) => {
        logger.error("error", "Your response from database");
        return err;
      });
  } catch (error) {
    console.log("OOPS!!!Error  from login");
  }
  return val;
};

module.exports = {
  SignupForm,
  getusers,
  deleteuser,
};
