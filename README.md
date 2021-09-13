# botonews

# Dans les grandes lignes
Le projet à le but de délivrer des news de différentes sources à
différentes personnes. Par "news", il est sous-entendu différentes
sources d'informations qui peuvent être obtenues via une API, un flux
RSS ou en scrapant des pages webs.

# Version 1
Pour commencer, je vous propose un bot Telegram qui récupère les
différentes sources d'information, les met en formes puis les envoies
aux différentes personnes. Je suis sûr que vous aurez plein d'autre
idées, mais voici quelques sources que j'aimerais voir dans le bot:

  - Les derniers liens raccourcis sur https://go.epfl.ch (via
https://go.epfl.ch/feed)
  - Les dernières news EPFL (via l'API rest
https://actu.epfl.ch/api-docs/)
  - Les dernières Hacker News (https://news.ycombinator.com/) via l'API
  - Les derniers messages Twitter de
https://twitter.com/neckbeardhacker, https://twitter.com/HipsterHacker
et https://twitter.com/php_ceo

# Version 2
Dans le but de vous faire acquérir des compétences pour vos cours
HTML/CSS/JS/PHP, cette évolution du projet doit présenter, sur un site
internet, une mise en page des différentes sources d'information
disponibles dans la version 1.
Ce sera aussi l'occasion de voir comment partager les informations
contenues dans le bot dans la page web et de discuter de la mise en
place d'une éventuelle API pour le projet, qui fournirait les
informations au bot et au site web.
Notez que cela sous-entend aussi que le site doit être à jour le plus
souvent possible, et que la récupération des données des sources
d'informations doit être fréquente.

# Version 3
Toujours dans la visions de vos prochains cours, une évolution du site
web pour permettre aux utilisateurs de s'inscrire et de configurer leurs
préférences. Sélection des sources d'informations, sur quel support les
envoyer (i.e. telegram, mail, ...), quand les recevoir, etc...
Garder en tête la notion de groupe, par exemple pour ajouter les
anniversaires : tout le monde dans un groupe sauf X reçoit l'info que
c'est l'anniversaire de X.

# Version 4
Cette version doit permettre aux utilisateurs d'ajouter de nouvelles
sources d'information qui seront ensuite validées avant d'être rendues
disponibles à tous les utilisateurs.
