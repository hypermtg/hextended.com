const fs = require('fs');

const allowedSets = [
    "fem",
    "hml",
    "ice",
    "all",
    "mir",
    "vis",
    "wth",
    "por",
    "tmp",
    "sth",
    "exo",
    "p02",
    "usg",
    "ulg",
    "uds",
    "mmq",
    "nem",
    "pcy",
    "inv",
    "pls",
    "apc",
    "ody",
    "tor",
    "jud",
    "ons",
    "lgn",
    "scg",
    "plgm",
    "parl"
];

var cards = require('./scryfall-default-cards.json');

cards = cards.filter(card => allowedSets.includes(card.set));
cards = cards.map(card => {
    return {
        name: card.name,
        scryfall_uri: card.scryfall_uri,
        cmc: card.cmc,
        set: card.set,
        collector_number: card.collector_number
    };
});

fs.writeFile('scryfall-filtered-cards.json', JSON.stringify(cards), 'utf8', console.error);
