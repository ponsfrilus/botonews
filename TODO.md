# TODO

## HomePage
Supprimer le dossier public-frontend et intégrer la homepage dans le code avec Express. Cela permet d'utiliser les fonctionnalités de PassportJS et donc d'afficher la homepage selon les préférences d'un utilisateur si il est logué.

1. Si l'utilisateur n'est pas logué, il a des paramètres par défaut. Il a un bouton sur sa homepage qui lui permettra de créer un compte pour définir ses préférences.
2. Si l'utilisateur est logué, ses paramètres par défaut sont ceux qu'il a défini "dans l'api".
3. Si l'utilisateur n'est pas logué mais qu'il a déjà un compte, ses préférences sont stockées dans le navigateur (local storage).

## API
Le système actuel de l'API n'implémente pas de système d'authentification.

- Authentifier les requêtes vers l'API (bearer token).
- Gestion des tokens des utilisateurs
- Rate Limit
- Logs d'utilisation

## Supports
- Bot Telegram  
- Bot Discord (webhook ?)  
- E-mails  

## Modularisation
Permettre aux utilisateurs de proposer, sous forme de code, de nouvelles sources d'informations (on doit pouvoir vérifier les informations).