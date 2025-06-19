const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const log = require('../middlewares/log');
const jwtAuth = require('../middlewares/auth'); // ? middleware JWT

// Données simulées
const services = [
  { name: 'Compute', description: 'Instances cloud rapides' },
  { name: 'Storage', description: 'Stockage haute disponibilité' }
];

//
// ?? Redirections API vers vues
//

router.get('/services', (req, res) => {
  res.redirect('/services/view');
});

router.get('/status', (req, res) => {
  res.redirect('/status/view');
});

//
// ? POST API
//

router.post(
  '/services',
  [
    body('name').isString().notEmpty().withMessage('Nom requis'),
    body('description').isString().isLength({ min: 5 }).withMessage('Description trop courte')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    services.push({ name, description });
    res.status(201).json({ message: 'Service ajouté', name });
  }
);

//
// ?? API protégée par JWT
//

router.get('/services/secure', jwtAuth, (req, res) => {
  res.json({ message: 'Accès sécurisé', user: req.user, services });
});

//
// ?? Vues EJS
//

router.get('/services/view', log, (req, res) => {
  res.render('services', { services });
});

router.get('/status/view', (req, res) => {
  res.render('status', {
    status: 'ok',
    uptime: process.uptime().toFixed(2)
  });
});

//
// ?? Connexion / Déconnexion
//

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'ninja') {
    req.session.user = 'admin';
    return res.redirect('/services/view');
  }

  res.render('login', { error: 'Identifiants incorrects' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
