const request = require('request');
const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0c514bd066816a1f94b5da50a897b70f&query=${encodeURIComponent(
    longitude, latitude 
  )}&units=f`;

  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const data = body.current;
      const description = data.weather_descriptions[0];
      callback(undefined, `forecast: ${description}, it is currently ${data.temperature} degrees out,and it feels like ${data.feelslike} degrees.The humidity is ${data.humidity} and there is a ${data.precip}% chance of rain.`);
    }
  });
};

module.exports = forecast;
