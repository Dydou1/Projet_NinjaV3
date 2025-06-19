#!/bin/bash
apt-get update
apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER ninja WITH PASSWORD 'ninja';"
sudo -u postgres createdb ninja_db -O ninja

