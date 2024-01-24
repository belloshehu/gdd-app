// extract a user property value from string of key and value separated by colon (":")
const stringToProperty = (propertyString) => {
  return propertyString.split(":")[1].trim();
};

// converts string of user with id, lat long from to object with the same properties
const userStringToObject = (userString) => {
  const [id, lat, long] = userString.split(",");
  return {
    id: stringToProperty(id),
    lat: parseFloat(stringToProperty(lat)),
    long: parseFloat(stringToProperty(long)),
  };
};

const isWithinDistance = (computedDistance) => {
  // check whether distance is less than or equal to 100km
  return computedDistance <= 100;
};

const getInvitedUserId = (distance, user) => {
  isWithinDistance(user, fintechCordinates) ? user.id : null;
};

const getInvitedUsersID = (distance, user) => {
  const invitedUsersIDs = [];
  if (
    isWithinDistance(
      computeDistance(user, {
        lat: 52.493256,
        long: 13.446082,
      })
    )
  ) {
    invitedUsersIDs.push(user.id);
  }
  return invitedUsersIDs;
};

const computeDistance = (user, fintechCordinate) => {
  /*
    Calculate distance between two cordinates on earth in kilometer
  */

  // converts latitudes and longitudes from degree to radian
  const userLat = (user.lat * Math.PI) / 180;
  const userLong = (user.long * Math.PI) / 180;
  const fintecLat = (fintechCordinate.lat * Math.PI) / 180;
  const fintecLong = (fintechCordinate.long * Math.PI) / 180;

  // Haversine formular
  const dLat = userLat - fintecLat;
  const dLong = userLong - fintecLong;
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(userLat) * Math.cos(fintecLat) * Math.pow(Math.sin(dLong / 2), 2);
  const c = Math.asin(Math.sqrt(a));

  const radius = 6371; // earch's radius in kilometer
  const distance = Math.abs(radius * c);
  return distance;
};

module.exports = {
  userStringToObject,
  isWithinDistance,
  computeDistance,
};
