/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let URL = "https://api.ipify.org?format=json";

  request(URL, (error, response, body) => {
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body, typeof(body)); // Print the HTML for the Google homepage.
  
    //Edge Case: Request Failed
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null); //return with auto-generated error message
      return; //return to index.js
    }
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    //the 'body' or IP address response is already returned in JSON format
    //use JSON.stringify to return IP address as a string
    //incorrect: callback(null, JSON.stringify(body));
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(IP, callback) {
  // use request to fetch IP address from JSON API
  let URL = "https://freegeoip.app/json/";
  //let URL = "https://freegeoip.app/json/162.245.144"; //invalid error test case

  request(URL, (error, response, body) => {
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body, typeof(body)); // Print the HTML for the Google homepage.
  
    //Edge Case: Request Failed
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null); //return with auto-generated error message
      return; //return to index.js
    }
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    //the 'body' or IP address response is already returned in JSON format
    //use JSON.stringify to return IP address as a string
    //incorrect: callback(null, JSON.stringify(body));
    const lat = JSON.parse(body).latitude.toString();
    const long = JSON.parse(body).longitude.toString();
    const coords = {
      lat,
      long
    };
    callback(null, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };