# Projet Ansible - Déploiement Infrastructure 3-Tiers

Ce projet utilise **Ansible** pour automatiser le déploiement d’une architecture **3 tiers** composée de :

- Un serveur **frontend** (Nginx)
- Un serveur **backend** (Node.js)
- Un serveur de **base de données** (PostgreSQL)

---

## Arborescence du projet

```
ansible/
├── ansible.cfg                  # Configuration globale Ansible
├── group_vars/
│   ├── all.yml                  # Variables communes
│   └── vault.yml                # Secrets chiffrés avec Ansible Vault
├── inventories/
│   ├── dev/hosts.yml            # Inventaire pour l'environnement de dev   
├── playbooks/
│   ├── frontend.yml             # Playbook Nginx
│   ├── backend.yml              # Playbook Node.js
│   └── db.yml                   # Playbook PostgreSQL
├── roles/
│   ├── nginx/
│   │   ├── tasks/main.yml
│   ├── nodejs/
│   │   ├── tasks/main.yml
│   └── postgres/
│       ├── tasks/main.yml
└── README.md
```

---

## Lancement d’un déploiement

### 1. Vérifie l’inventaire

Modifie `inventories/dev/hosts.yml` avec les IP de tes machines Vagrant ou VirtualBox :
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

Pour déployer uniquement le frontend :
```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/frontend.yml
```

Pour tout déployer dans l’ordre (via site.yml si tu l’as) :
```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/site.yml
```

---

## Ansible Vault (secrets)

Pour chiffrer un fichier de mots de passe :
```bash
ansible-vault encrypt group_vars/vault.yml
```

Pour l'utiliser :
```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/db.yml --ask-vault-pass
```

---

## Description des rôles

### nginx/
- Installe **Nginx**
- Déploie un fichier de configuration personnalisé (`default.conf.j2`)
- Active le service

### nodejs/
- Installe Node.js via un script officiel (v16)
- Copie ton app dans `/var/www/`
- Lancement automatique possible via `systemd` ou `pm2`

### postgres/
- Installe PostgreSQL
- Crée une base de données, un utilisateur
- Exécute un script SQL pour initialiser la base (`init.sql.j2`)

---

## Conseils utiles

- Utilise `--check` pour faire un **dry-run** (pas d’exécution réelle)
- Relance `vagrant provision` si tu modifies la config des machines
- Lance tes tests avec Testinfra (voir dossier `tests/` si tu en as un)
- Commence par un rôle simple pour comprendre la logique

---

## 🛠 Prérequis recommandés

- [x] Ansible ≥ 2.9
- [x] Python3, sshpass
- [x] Vagrant + VirtualBox pour les tests locaux
- [x] Configuration des clés SSH si besoin (`ssh-copy-id`)

---

## Exemple de commande complète

```bash
ansible-playbook -i inventories/dev/hosts.yml playbooks/site.yml --ask-vault-pass
```

---
