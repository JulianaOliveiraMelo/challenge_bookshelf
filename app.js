// Pour une présentation de notre séléction littéraire 
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require('http');

// pour utiliser pretty, j'ai besoin de l'installer (npm install pretty)
// puisque c'était mon premier module npm, j'ai dû lancer d'abord npm init
// et parce que, pour un seul module utilisé, j'en ai installé une trentaine, je n'oublie pas non plus l'étape du .gitignore
const pretty = require('pretty');

const moment = require('moment');

// Séléction de livres incontournables
const books = [
    {
        title: "The Fellowship of the Ring",
        language: "English",
        country: "United Kingdom",
        author: "J.R.R. Tolkien",
        date: "1954-07-29"
    },
    {
        title: "Prelude to foundation",
        language: "English",
        country: "United States",
        author: "Isaac Asimov",
        date: "1988-11-08"
    },
    {
        title: "Voyage au centre de la terre",
        language: "Français",
        country: "France",
        author: "Jules Verne",
        date: "1864-11-25"
    },
    {
        title: "La nuit des temps",
        language: "Français",
        country: "France",
        author: "René Barjavel",
        date: "1968-05-20"
    },
    {
        title: "Carrion Comfort",
        language: "English",
        country: "United States",
        author: "Dan Simmons",
        date: "1989-02-15"
    }
];

const toHTML = (collection) => {
    let html = '<table>';

    // ici, on va parcourir l'array pour générer une tr par élément
    // for of : super pratique pour les tableaux, il nous permet de récupérer chaque élément du tableau l'un après l'autre
    // inconvénient : on ne récupère pas l'index de l'élément, uniquement l'élément
    // à droite du of, je place l'array que je veux parcourir, ici collection, mon paramètre
    // à gauche du of, je place une variable, que je nomme comme je veux et qui va contenir "l'élément actuel" de l'array (un élément par itération)
    for (let book of collection) {
        html += `<tr>`;

        // 2e nouvelle structure, plus utile pour les objects cette fois-ci
        // for in : boucle sur un object et en récupère les CLÉS (pas les valeurs)
        // mais on s'en fiche, puisqu'avec object[clé], on peut récupérer la valeur correspondant à la clé
        for (let key in book) {
            if (key === "date") {
                // je me crée une variable intermédiaire qui contient la date, version moment
                let mDate = moment(book.date);

                // au final, on génère quand même une td, mais on met une valeur un peu particulière dedans
                // la méthode format() d'une date moment permet de choisir le format d'affichage de la date
                html += `<td>${mDate.format("dddd, MMMM Do YYYY")}</td>`;
            } else {
                html += `<td>${book[key]}</td>`;
            }
        }

        html += `</tr>`;
    }

    html += '</table>';

    return pretty(html);
};


// Création de notre serveur
const server = http.createServer((req, res) => {

    // On court-circuite l'appel automatique du navigateur au favicon.ico
    // sinon l'appel au script ce fera 2 fois et il ecrira "Hum, 50 alors ?" dedans
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // On écrit l'entête de notre page html
    res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge">    <title>Document</title></head><body>');

    // Corps de la page
    res.write(toHTML(books));

    // On écrit le pied de page de notre page html
    res.write('</body></html>');

    // On à fini d'envoyer nos informations au client
    res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000, console.log("listening..."));