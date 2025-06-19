const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const servicesRoute = require('./routes/services');

const app = express();

// Middleware global
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', servicesRoute);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

module.exports = app;
