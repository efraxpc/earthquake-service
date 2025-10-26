const express = require('express');
const EarthquakeProducer = require('./services/earthquake');

const app = express();
const earthquakeProducer = new EarthquakeProducer();

// Función para ejecutar la transmisión
app.post('/earthquake-events/start', async (req, res) => {
  earthquakeProducer.runEarthquake();
  res.status(200).send('Earthquake event stream started');
});

// Detener la transmisión de eventos sísmicos
app.post('/earthquake-events/stop', (req, res) => {
  earthquakeProducer.stopEarthquake();
  res.status(200).send('Earthquake event stream stopped');
});

module.exports = app;