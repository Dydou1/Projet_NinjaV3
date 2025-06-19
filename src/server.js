const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const app = require('./app');

const PORT_HTTP = 3001;
const PORT_HTTPS = 3443;

// Chemins absolus vers les certificats SSL
const sslPath = path.join(__dirname, 'ssl');
const options = {
  key: fs.readFileSync(path.join(sslPath, 'server.key')),
  cert: fs.readFileSync(path.join(sslPath, 'server.crt')),
};

// Serveur HTTPS sécurisé
https.createServer(options, app).listen(PORT_HTTPS, '0.0.0.0', () => {
  console.log(`Serveur HTTPS lancé sur https://localhost:${PORT_HTTPS}`);
});

// Serveur HTTP qui redirige vers HTTPS
http.createServer((req, res) => {
  const host = req.headers.host.split(':')[0];
  res.writeHead(301, {
    Location: `https://${host}:${PORT_HTTPS}${req.url}`,
  });
  res.end();
}).listen(PORT_HTTP, () => {
  console.log(`Redirection HTTP active sur http://localhost:${PORT_HTTP}`);
});

