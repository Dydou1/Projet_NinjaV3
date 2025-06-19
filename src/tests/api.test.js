const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('? API - /status', () => {
  it('GET /status/view doit retourner le statut de l\'application', async () => {
    const res = await request(app).get('/status/view');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('status'); // s�il y a du texte HTML
  });
});

describe('? API - /services', () => {
  it('GET /services doit rediriger vers /services/view', async () => {
    const res = await request(app).get('/services');
    expect(res.statusCode).toBe(302); // Redirection
    expect(res.headers.location).toBe('/services/view');
  });

  it('POST /services doit rejeter les donn�es invalides', async () => {
    const res = await request(app).post('/services').send({
      name: '', // nom vide
      description: 'abc' // trop court
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('POST /services accepte un service valide', async () => {
    const res = await request(app).post('/services').send({
      name: 'Backup',
      description: 'Service de sauvegarde cloud s�curis�'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Service ajout�');
  });

  it('GET /services/secure retourne les services avec JWT valide', async () => {
    const token = jwt.sign({ username: 'admin' }, 'devops-secret'); // m�me cl� que dans auth.js
    const res = await request(app)
      .get('/services/secure')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Acc�s s�curis�');
    expect(res.body).toHaveProperty('services');
  });

  it('GET /services/secure retourne 401 sans JWT', async () => {
    const res = await request(app).get('/services/secure');
    expect(res.statusCode).toBe(401);
  });
});
