// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');


// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => {
//     console.log(body);
//   })





const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (let i = 0; i < passTimes.length; i++) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTimes[i].risetime);
    const duration = passTimes[i]["duration"];
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });