//(function(){})();

var gameBoard = document.getElementById('game-board');
var cardsValues = ["💩", "🔑", "🔥", "💸"];
var card;
var deck = [];
var inPlay = [];

function shuffleDeck() {
    // Fisher–Yates Shuffle
    var m = deck.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = deck[m];
        deck[m] = deck[i];
        deck[i] = t;
    }
    return deck;
}

function createDeck() {
    for (var i = 0; i < cardsValues.length; i++) {
        deck.push(cardsValues[i], cardsValues[i]);
    }
    shuffleDeck();
}

function createCard() {
    card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', flipCard);
}

function clearCards() {
    var card_1 = document.getElementById(inPlay[0].card.id);
    var card_2 = document.getElementById(inPlay[1].card.id);
    card_1.innerHTML = '';
    card_1.className = 'card cleared';
    card_2.innerHTML = '';
    card_2.className = 'card cleared';
    inPlay.length = 0;
}

function addMatch() {
    var card_1 = document.getElementById(inPlay[0].card.id);
    var card_2 = document.getElementById(inPlay[1].card.id);
    card_1.innerHTML = inPlay[0].card.attribute;
    card_1.removeEventListener('click', flipCard);
    card_1.className = 'card selected matched';
    card_2.innerHTML = inPlay[1].card.attribute;
    card_2.removeEventListener('click', flipCard);
    card_2.className = 'card selected matched second';

    inPlay.length = 0;
}

function dealCards() {
    for (var i = 0; i < deck.length; i++) {
        createCard();
        card.id = 'card-' + [i + 1];
        card.setAttribute('data', deck[i]);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    inPlay.push({card: {id: this.id, attribute: this.getAttribute('data')}});
    this.className = 'card selected';
    if (inPlay.length <= 1) {
        console.log('first card - ' + inPlay[0].card.attribute);
        this.innerHTML = inPlay[0].card.attribute;
    } else if (inPlay.length === 2) {
        console.log('second card - ' + inPlay[1].card.attribute);
        this.innerHTML = inPlay[1].card.attribute;
        if (inPlay[0].card.id === this.id) {
            console.log('- same card!');
            inPlay.pop();
        } else if (inPlay[0].card.attribute === inPlay[1].card.attribute) {
            console.log('- match!');
            addMatch();
        } else {
            console.log('- no match!');
            setTimeout(clearCards, 600);
        }

    }
}

createDeck();
dealCards();