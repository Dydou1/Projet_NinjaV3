#!/bin/bash

# === CONFIGURATION ===
REPO_URL="https://github.com/Dydou1/Projet_NinjaV3"
RUNNER_VERSION="2.325.0"
TOKEN="AL5D4CVPUPTLHGLUJ2KKPILIKW2NY"  # Jetable, expire dans 1h
RUNNER_DIR="$HOME/actions-runner"

# === INSTALLATION ===
echo "Création du dossier runner..."
mkdir -p "$RUNNER_DIR"
cd "$RUNNER_DIR"

echo "⬇Téléchargement de la version $RUNNER_VERSION..."
curl -o actions-runner-linux-x64.tar.gz -L "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"

echo "Extraction..."
tar xzf actions-runner-linux-x64.tar.gz

# === CONFIGURATION ===
echo "Configuration du runner pour $REPO_URL..."
./config.sh --url "$REPO_URL" --token "$TOKEN" --unattended --name "self-hosted-runner"

# === LANCEMENT ===
echo "Lancement du runner (laisser ce terminal ouvert)"
./run.sh
