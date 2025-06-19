const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const app = express();

// ðŸ” Gestion des sessions
app.use(session({
  secret: 'devops-ninja-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Middleware pour parser le JSON et les donnÃ©es des formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Ajoute automatiquement les en-têtes HTTP de sécurité
app.use(helmet());

// Routes : toutes les routes de services.js sans prÃ©fixe
const servicesRoute = require('./routes/services');
app.use(servicesRoute);


// Page d'accueil (optionnelle)
app.get('/', (req, res) => {
  const services = [
    { name: 'Compute', description: 'Instances cloud rapides' },
    { name: 'Storage', description: 'Stockage haute disponibilitÃ©' }
  ];
  res.render('index', { services });
});

// sonde pour kube
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;




