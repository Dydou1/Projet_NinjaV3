# 📦 Projet DevOps - Vagrant

## 🧰 Prérequis

- VirtualBox installé : [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)
- Vagrant installé : [https://developer.hashicorp.com/vagrant/downloads](https://developer.hashicorp.com/vagrant/downloads)
- (Optionnel) WSL activé pour l'utilisation de Vagrant via un terminal Bash

## 💡 Installation de Vagrant sur Windows

1. Télécharger Vagrant depuis : [https://developer.hashicorp.com/vagrant/downloads](https://developer.hashicorp.com/vagrant/downloads)
2. Exécuter l’installateur (`.msi`) et suivre les étapes.
3. Redémarrer votre ordinateur.
4. Vérifier l’installation :

```bash
vagrant -v
```

## 📁 Arborescence

```
Projet_NinjaV3/
├── provision/
│   ├── frontend.sh
│   ├── backend.sh
│   ├── db.sh
│   └── ansible.sh
├── Vagrantfile
└── README.md
```

## 📦 Machines Virtuelles

| Nom de la VM | IP            | Description         |
| ------------ | ------------- | ------------------- |
| frontend     | 192.168.56.10 | Serveur NGINX       |
| backend      | 192.168.56.11 | Application Node.js |
| db           | 192.168.56.12 | Base de données     |
| ansible      | 192.168.56.13 | Serveur Ansible     |

## ▶️ Lancement

Dans un terminal à la racine du projet :

```bash
vagrant up --provider=virtualbox
```

## 📜 Utilisation

- Se connecter à une VM :

```bash
vagrant ssh frontend
```

- Arrêter les VMs :

```bash
vagrant halt
```

- Détruire les VMs :

```bash
vagrant destroy
```

## 🔧 Provisioning automatique

Chaque VM est configurée automatiquement via les scripts présents dans le dossier `provision/`.

## 🛠️ Exemple d’ajout de la VM Ansible dans `Vagrantfile`

```ruby
# VM Ansible
config.vm.define "ansible" do |ansible|
  ansible.vm.box = "ubuntu/bionic64"
  ansible.vm.hostname = "ansible"
  ansible.vm.network "private_network", ip: "192.168.56.13"
  ansible.vm.provision "shell", path: "provision/ansible.sh"
end
```

## ✅ Vérification

Pour chaque machine :

- Vérifier l’installation des paquets
- Tester la connectivité entre VMs (ping)
- Vérifier les services lancés (`nginx`, `node`, `postgres`...)

---

© Projet étudiant DevOps - Ecole IT

