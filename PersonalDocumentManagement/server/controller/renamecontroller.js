const my_db = require("../db");
const logger = require("../logger/logger");
var renameDocuments = async (object) => {
  try {
    var val = await my_db
      .add(object, "document_management")
      .then((data) => {
        logger.info(` updated successfully;`);
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
module.exports = {
  renameDocuments,
};
