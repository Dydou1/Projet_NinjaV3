#!/bin/bash

echo "Mise à jour des paquets..."
apt-get update -y

echo "Installation de PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

echo "PostgreSQL installé."

echo "Démarrage automatique de PostgreSQL..."
sudo systemctl enable postgresql
sudo systemctl start postgresql

echo "Création de l'utilisateur 'ninja' et de la base 'ninja_db'..."
sudo -u postgres psql -c "CREATE USER ninja WITH PASSWORD 'ninjapass';"
sudo -u postgres createdb ninja_db -O ninja

echo "Base de données 'ninja_db' créée avec succès, propriétaire : 'ninja'."

echo "Vérification du statut PostgreSQL..."
sudo systemctl status postgresql | grep Active
