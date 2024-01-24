const fs = require("fs");
const {
  userStringToObject,
  isWithinDistance,
  computeDistance,
} = require("./helpers");

const users = [];
const invitedUsersIDs = [];
const fintechCordinate = {
  lat: 52.493256,
  long: 13.446082,
};
try {
  fs.readFile("./data/users.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // convert user data text into array of user data string
    const lines = data.split("\n");

    // clean user data and store it as array of user object
    lines.forEach((user) => {
      user = userStringToObject(user.trim());
      users.push(user);

      const distance = computeDistance(user, fintechCordinate);

      if (isNaN(distance)) {
        console.log(`User with Id ${user.id} has invalid cordinate`);
      } else {
        if (isWithinDistance(distance)) {
          invitedUsersIDs.push(user.id);
        }
      }
    });
    // console.log(users);
    console.log(invitedUsersIDs.length, "users invited among", users.length);
  });
} catch (error) {
  throw new Error(error);
}
