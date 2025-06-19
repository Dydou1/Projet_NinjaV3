#!/bin/bash

# === CONFIGURATION ===
REPO_URL="https://github.com/Dydou1/Projet_Ninja"
RUNNER_VERSION="2.324.0"
TOKEN="AL5D4CS6ZSEYZVXR34MUNJTIG3OFI"

# === INSTALLATION ===
echo " Création du dossier runner..."
mkdir -p ~/actions-runner && cd ~/actions-runner

echo " Téléchargement de la version $RUNNER_VERSION..."
curl -o actions-runner-linux-x64.tar.gz -L "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"

echo " Extraction..."
tar xzf actions-runner-linux-x64.tar.gz

# === CONFIGURATION ===
echo " Configuration du runner pour $REPO_URL..."
./config.sh --url "$REPO_URL" --token "$TOKEN" --unattended --name "self-hosted-runner"

# === LANCEMENT ===
echo " Lancement du runner (ce terminal doit rester ouvert)"
./run.sh
