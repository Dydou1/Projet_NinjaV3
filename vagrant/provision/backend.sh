#!/bin/bash
apt-get update
apt-get install -y curl gnupg
curl -sL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs git

# Cloner le backend depuis ton dépôt GitHub (remplace le lien)
git clone https://github.com/ton-utilisateur/ton-backend.git /home/vagrant/app
cd /home/vagrant/app
npm install
npm start &

