# DevOps Ninja - Catalogue de Services CloudNinja

Bienvenue dans le projet **DevOps Ninja** ! Cette application web permet aux clients de CloudNinja Corp de consulter le catalogue de services via une API REST sécurisée et déployée en environnement Kubernetes.

## Fonctionnalités

- API REST en Node.js (Express)
- Interface utilisateur minimale (HTML/CSS/JS)
- Conteneurisation Docker optimisée
- Déploiement sur Kubernetes avec haute disponibilité
- CI/CD complet via GitHub Actions
- Sécurité : authentification, HTTPS, Helmet.js, audit des dépendances
- Observabilité avec Prometheus et Grafana

## Installation et exécution

### Prérequis

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) ou les paquets Docker sur linux (https://docs.docker.com/engine/install/ubuntu/)
- [Minikube](https://minikube.sigs.k8s.io/) ou [K3s](https://k3s.io/) + 
- [Git](https://git-scm.com/) + CLI
- [Kubernetes](https://kubernetes.io/fr/docs/tasks/tools/install-kubectl/)

### Installation

```bash
git clone https://github.com/Dydou1/devops-ninja.git
cd devops-ninja
npm install
```

## Sécurisation avec HTTPS

L'application prend en charge les connexions sécurisées via le protocole HTTPS, avec prise en charge de la redirection automatique des requêtes HTTP vers HTTPS. Cela permet d'assurer la confidentialité et l'intégrité des données échangées entre le client et le serveur.

### Objectifs

Déployer un site web pour afficher le status et les services en HTTPS, hébergé via Docker et Kubernetes afin d'assurer sa haute disponibilité et sa sécurité.

### Génération d'un certificat auto-signé (pour développement uniquement)

Si vous n'avez pas encore de certificat SSL, vous pouvez en générer un auto-signé avec OpenSSL :

```bash
mkdir -p src/ssl
openssl req -x509 -nodes -newkey rsa:2048 -keyout src/ssl/server.key -out src/ssl/server.crt -days 365
```

Vous pouvez remplir les champs demandés ou appuyer sur Entrée pour conserver les valeurs par défaut.

> Note : Un certificat auto-signé affichera une alerte dans les navigateurs. Cela est attendu en environnement de développement.

### Exemple de serveur sécurisé avec redirection

Le fichier `src/server.js` a été modifié pour inclure :

- un serveur HTTPS sur le port 3443 ;
- un serveur HTTP sur le port 3001, qui redirige vers HTTPS.

```js
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const app = require('./app');

const sslPath = path.join(__dirname, 'ssl');
const options = {
  key: fs.readFileSync(path.join(sslPath, 'server.key')),
  cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
};

https.createServer(options, app).listen(3443, () => {
  console.log('Serveur HTTPS lancé sur https://localhost:3443');
});

http.createServer((req, res) => {
  const host = req.headers.host.split(':')[0];
  res.writeHead(301, { Location: `https://${host}:3443${req.url}` });
  res.end();
}).listen(3001, () => {
  console.log('Redirection HTTP active sur http://localhost:3001');
});
```

### Utilisation de Helmet

Le projet intègre également le middleware Helmet afin d'ajouter automatiquement des en-têtes de sécurité HTTP. Cela permet de réduire les vulnérabilités courantes (XSS, injection de contenu, etc.).

Helmet est utilisé comme middleware dans `app.js` :

```js
const helmet = require('./middlewares/helmet');
app.use(helmet);
```

Le fichier `src/middlewares/helmet.js` contient la configuration suivante :

```js
const helmet = require('helmet');

module.exports = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
});
```

### Accès sécurisé

Une fois le serveur lancé (`npm start`), accédez à :

- https://localhost:3443 → Connexion sécurisée (avec alerte si certificat auto-signé)
- http://localhost:3001 → Redirection automatique vers HTTPS

----------------------------------------------------------------------------------------------

## Vous pouvez lancer directement dans le dossier du projet en local avec Docker Compose

#### La commande pour build
```sh
docker-compose up --build
```
##### Si un problème persisite à cause d'une ancienne image
```sh
docker-compose down --volumes
docker system prune -f
```
#### soit curl ce url, soit utiliser un navigateur dans la VM locale
```sh
https://localhost:3443
```

## Lancer minikube
```sh
minikube start
```
```sh
minikube addons enable ingress
```

## Créer le secret qui permet au ingress de marcher
```sh
kubectl create secret tls tls-secret \
  --cert=src/ssl/server.crt \
  --key=src/ssl/server.key
```

## Construire l'image, appliquer les fichier de Kube

#### rentrer dans le minikube
```sh
eval $(minikube docker-env)
```

#### Contruire l'image
```sh
docker build -t projet_ninja_app .
```

#### Appliquer tout les fichiers
```sh
kubectl apply -f k8s/
```

## On peut définir soit un nom de domaine grace au ingress, soit utiliser un port forwarding

#### Pour l'ingress

-sur le fichier de la route suivante
```route
C:\Windows\System32\drivers\etc\hosts
```
-ajouter cela à la fin du fichier
```hosts
<MINIKUBE_IP>    devops.local
```
-l'ip se retrouve en effectuant cette commande
```sh
minikube ip
```
#### Via un port forwarding
```sh
kubectl port-forward service/devops-ninja-service --address 0.0.0.0 3443:443
```
```sh
https://<IP de la VM>:3443
```
accepter les risques, en effet, le certificat est auto signé, donc non reconnu par les organisations 


## Nettoyer une fois si on veut down tout

```sh
kubectl delete -f k8s/
minikube stop
docker-compose down
```
-----------------------------------------------------------------------------------

## Pour la partie workflow

#### Lancer la commande suivante, et laisser ce terminal ouvert
```sh
./start-runner.sh
```
#### Et ensuite, lors du push, le workflow lance sans soucis
```sh
git push origin master
```

