# AppVueCli
[Master 2 MIAGE] Mini projet Javascript réalisé en Angular

> Base de données d'observation d'objets non identifiés

## Build Setup Serveur
``` bash
# Installation des dependences
cd Chaibi_Khchiou_AlienTp
npm install

# Executer le script d'importation des données sur Mongo
# Ce script effectue un tri sur les données et insert deux tables Cas et Temoignage sur mongoDb
node ScriptImportCsv.js


# Lancement du serveur sur localhost:8080
node serverCrudWithMongo.js
```

## Build Setup Client
``` bash
# Installation des dependences
cd ui
npm install


# Lancement du client
ng serve --open
```

### Fonctionnalité 

- Au chargement, une liste de cas est récupérée à partir de la base de données et affichée dans un tableau.
- Un titre au dessus de ce tableau indique le nombre total de cas répertorié dans la base, et le numéro de page affiché actuellement.
- Un slider, permet de choisir le nombre de cas qu'on veut afficher par page (par défaut 10)
- Le bouton "Ajouter cas" permet d'afficher un formulaire et de soumettre un nouveau cas
- Des boutons en bas du tableau permettent de défiler d'une page à une autre.
- Possibilité d'afficher les détails d'un cas en cliquant sur son nom. Une pop-up s'ouvre avec différentes informations.
- En cliquant sur l'un des boutons "Supprimer", le cas est supprimé de la base.
- En cliquant sur modifier, un formulaire s'affiche et permet de modifier les informations du Cas (le bouton "annuler" permet de fermer le formulaire)