// const {fetchMyIP} = require('./iss');
// const {fetchCoordsByIP} = require('./iss');
// const {fetchISSFlyOverTimes} = require('./iss');

const {nextISSTimesForMyLocation} = require('./iss');




// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });



// fetchCoordsByIP("00.000.000.000", (error, coordinates) => {

//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log(coordinates);

// });

// const coordinatesObj = {latitude: "43.7687", longitude: "-79.4109"};

// fetchISSFlyOverTimes(coordinatesObj, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! These are the flyover times:', passTimes)
// })


// const {nextISSTimesForMyLocation} = require('./iss');

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });


const printPassTimes = function(passTimes) {
  for (let i = 0; i < passTimes.length; i++) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTimes[i].risetime);
    const duration = passTimes[i]["duration"];
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});    