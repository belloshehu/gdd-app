const fs = require("fs");

const readUsersData = () => {
  try {
    fs.readFileSync("data.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      return data;
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = readUsersData;
