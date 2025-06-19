// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'devops-secret'; // À sécuriser dans secret.yaml

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide' });
  }
}

module.exports = authenticate;
