const request = require('request');
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2h1Y2sxNSIsImEiOiJja3J3MGpjazAwYnNqMm9sajVjOGttaHB4In0.CbZo_sND7vjTtls2po6bxg&limit=1`;

  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback('Unable to connect to mapbox geocoding services!', undefined);
    } else if (body.features.length === 0) {
      /* or if (data.length === 0)*/
      callback(
        'Unable to find cordinates! Check the location name.',
        undefined
      );
    } else {
      const data = body.features[0];

      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name,
      });
    }
  });
};

module.exports = geocode;
