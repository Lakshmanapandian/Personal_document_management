const my_db = require("../db");
const logger = require("../logger/logger");

const getadmin = async (obj) => {
  let val;
  try {
    val = await my_db
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
    console.log("OOPS!!!Error  from getdmin");
  }
  return val;
};
const deleteuser = async (id, rev) => {
  let val;
  try {
    val = await my_db
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
    console.log("OOPS!!!Error  from deleteuser ");
  }
  return val;
};
module.exports = { getadmin, deleteuser };
