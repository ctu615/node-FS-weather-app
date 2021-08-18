const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const print = console.log;
const name = 'Alpha Codes';

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars or hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    message: 'This is the help message.',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide a address',
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({error});
      } else {
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error});
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: address,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a serach term',
    });
  }
  //print(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help Error',
    name,
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name,
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  print(`Server is up on port ${port}.`);
});
