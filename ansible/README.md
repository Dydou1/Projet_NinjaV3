# Projet Ansible - Déploiement 3 Tiers

Ce projet Ansible automatise l'installation et la configuration de **trois serveurs** : un pour Nginx (frontend), un pour Node.js (backend) et un pour PostgreSQL (base de données).

---

## Structure du projet

```
ansible_project/
├── ansible.cfg                # Configuration Ansible
├── group_vars/                # Variables et secrets
│   ├── all.yml
│   └── vault.yml              # À chiffrer avec Ansible Vault
├── inventories/               # Inventaires (groupes de serveurs)
│   ├── dev/hosts.yml
│   └── prod/hosts.yml
├── playbooks/                 # Scripts d'installation
│   ├── frontend.yml
│   ├── backend.yml
│   └── db.yml
├── roles/                     # Rôles Ansible
│   ├── nginx/
│   │   ├── tasks/main.yml
│   │   └── templates/
│   ├── nodejs/
│   │   ├── tasks/main.yml
│   │   └── files/app/
│   └── postgres/
│       ├── tasks/main.yml
│       └── templates/init.sql.j2
└── README.md
```

---

## Étapes de base pour utiliser ce projet

### 1. Modifier les fichiers d'inventaire

Vérifie que `inventories/dev/hosts.yml` contient bien les bonnes IP de tes VMs :
```yaml
all:
  children:
    frontend:
      hosts:
        192.168.56.10:
    backend:
      hosts:
        192.168.56.11:
    db:
      hosts:
        192.168.56.12:
```

### 2. Lancer un playbook

Exemple pour le frontend (Nginx) :
```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/frontend.yml
```

---

## Gestion des mots de passe avec Ansible Vault

Pour chiffrer un fichier :

```bash
ansible-vault encrypt group_vars/vault.yml
```

Pour l’utiliser :
```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/db.yml --ask-vault-pass
```

---

## Ce que fait chaque rôle

### nginx/
- Installe Nginx via `apt`
- Peut ajouter une config personnalisée dans `templates/`

### nodejs/
- Installe Node.js (version 16.x)
- Tu peux mettre tes fichiers d'application dans `files/app/`

### postgres/
- Installe PostgreSQL
- Crée une base et un utilisateur
- Initialise la base via le fichier SQL `init.sql.j2`

---

## Conseils pour les étudiants

- Fais tes tests sur un environnement de type **Vagrant ou VirtualBox**
- Utilise des **IP fixes** dans le fichier d'inventaire
- Commence par un seul rôle pour apprendre progressivement
- Tu peux utiliser `--check` pour simuler sans exécuter

---

