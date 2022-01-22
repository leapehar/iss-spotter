
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  const endpoint = "https://api.ipify.org?format=json";

  request(endpoint, (error, response, body) => {

    const ipData = JSON.parse(body);
    const ip = ipData.ip;

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    return callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {

  const endpoint = `https://freegeoip.app/json/${ip}`;
  request(endpoint, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
}

const fetchISSFlyOverTimes = function(coords, callback) {
  const endpoint = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(endpoint, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {

      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });
};



module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};