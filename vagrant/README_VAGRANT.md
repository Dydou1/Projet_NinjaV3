
# Infrastructure 3-tier avec Vagrant

## Objectif
Simuler une architecture composée de trois VMs pour représenter une stack **frontend-backend-database**.

---

## Machines Virtuelles

| Nom       | IP              | Utilisateur Linux | Logiciels installés        |
|-----------|------------------|-------------------|-----------------------------|
| frontend  | 192.168.56.10    | vagrant           | Nginx                       |
| backend   | 192.168.56.11    | vagrant           | Node.js + Application       |
| database  | 192.168.56.12    | vagrant           | PostgreSQL                  |

---

## Lancement des VMs

Dans le dossier `vagrant`, lancez simplement :

```bash
cd vagrant
vagrant up --provider=virtualbox --provision
```

> Le provisioning installe automatiquement les paquets nécessaires sur chaque VM.

---

## Accès aux machines

Utilisez `vagrant ssh` pour accéder aux différentes VMs :

```bash
vagrant ssh frontend
vagrant ssh backend
vagrant ssh database
```

---

## Vérification des services

### Backend (Node.js)
```bash
curl https://192.168.56.11:3443
```

### Frontend (Nginx)
```bash
curl http://192.168.56.10
```

### Base de données (PostgreSQL)
```bash
psql -U vagrant -h 127.0.0.1 -d ninja
```
> Identifiants définis dans le playbook ou provisioning.

---

## Conseils

- Vérifiez bien que **VirtualBox** est installé.
- Le fichier `Vagrantfile` définit les IP et la structure réseau.
- Les VMs utilisent une **private network** pour communiquer entre elles.

---
