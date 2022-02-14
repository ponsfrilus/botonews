# Botonews

Botonews a pour but de fournir une plateforme de distribution de news, à partir de différentes sources à destination de différents supports, en fonction des préférences de l'utilisateur. Botonews permet de recevoir les informations souhaitées sur différents supports comme [Discord](https://discord.com), [Telegram](https://telegram.org) ou encore par e-mail.

## Table des matières 
  - [Comment installer Botonews](#comment-installer-botonews)
  - [Terminologie](#terminologie)
  - [Technologies](#technologies)

## Comment installer Botonews

1. Cloner le repo avec [Git](https://git-scm.com/) : `git clone git@github.com:Azecko/botonews.git`
2. Se déplacer dans le répertoire : `cd botonews`
3. Renommer `sample.env-auth` et `sample.env-db` en `.env-auth` et `.env-db` et y remplacer les données avec vos données.
4. Démarrer les conteneurs grâce à la commande : `docker-compose up`
5. Se rendre sur https://localhost:8081/login et profiter ! :)  
*En cas de problème, [ouvrir une issue](https://github.com/Azecko/botonews/issues/new)*

## Terminologie

- **Sources** : Une source est une source d'information, par exemple : NewYorkTimes, LeTemps, 20minutes, etc.
- **Supports** : Un support permet de recevoir les informations souhaitées, par exemple : Discord, Telegram, e-mails, etc.
- **Subscriptions** : Une subscription est un abonnement relié entre un utilisateur, un support, et une ou plusieurs source(s). Un abonnement peut aussi contenir des modalités, comme une heure et des jours. Exemple : L'utilisateur Azecko souhaite recevoir les nouveaux articles du NewYorkTimes et du 20minutes tous les Samedis à 18h sur Discord.

## Technologies

- [Bootstrap](https://getbootstrap.com/)
- [EJS](https://ejs.co/)
- [ExpressJS](https://expressjs.com/fr/)
- [Gravatar](https://en.gravatar.com)
- [MySQL](https://www.mysql.com/fr/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [PassportJS](https://www.passportjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributeurs
<!-- start_contributors mode:bubble -->
![@Azecko avatar](https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/30987143?v=4&h=144&w=144&fit=cover&mask=circle&maxage=7d)
![@ponsfrilus avatar](https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/176002?v=4&h=144&w=144&fit=cover&mask=circle&maxage=7d)
![@SaphireVert avatar](https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/45922476?v=4&h=144&w=144&fit=cover&mask=circle&maxage=7d)
<!-- end_contributors -->