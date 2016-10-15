// WDI Fundamentals Pre-Work
//
// Hopefully a more robust version of the pre-work assignment.
//

var gameBoard = document.getElementById('game-board');
var cardsValues = ["💩", "🔑", "🔥", "💸"];
var card;
var deck = [];
var inPlay = [];
var matched = [];

function shuffleDeck() {
    // Fisher–Yates Shuffle
    //var m = deck.length, t, i;
    //while (m) {
    //    i = Math.floor(Math.random() * m--);
    //    t = deck[m];
    //    deck[m] = deck[i];
    //    deck[i] = t;
    //}
    //return deck;
}

function createDeck() {
    deck.length = 0;
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
        this.innerHTML = '<span class="fade-in">' +inPlay[0].card.attribute + '</span>';
    } else if (inPlay.length === 2) {
        console.log('second card - ' + inPlay[1].card.attribute);
        if (inPlay[0].card.id === this.id) {
            console.log('- same card!');
            inPlay.pop();
        } else if (inPlay[0].card.attribute === inPlay[1].card.attribute) {
            this.innerHTML = '<span class="fade-in">' + inPlay[1].card.attribute + '</span>';
            console.log('- match!');
            addMatch();
        } else {
            this.innerHTML = '<span class="fade-in">' + inPlay[1].card.attribute + '</span>';
            console.log('- no match!');
            setTimeout(clearCards, 600);
        }

    }
    if (matched.length === deck.length) {
        console.log('you win');
        setTimeout(clearBoard, 2000);
    }
}

function addMatch() {
    var card_1 = document.getElementById(inPlay[0].card.id);
    var card_2 = document.getElementById(inPlay[1].card.id);
    card_1.innerHTML = inPlay[0].card.attribute;
    card_1.removeEventListener('click', flipCard);
    card_1.className = 'card selected';
    card_2.innerHTML = inPlay[1].card.attribute;
    card_2.removeEventListener('click', flipCard);
    card_2.className = 'card selected';
    matched.push(inPlay[0],inPlay[1]);
    inPlay.length = 0;
}

function clearCards() {
    var card_1 = document.getElementById(inPlay[0].card.id);
    var card_2 = document.getElementById(inPlay[1].card.id);
    card_1.innerHTML = '<span class="fade-out"></span>';
    card_1.className = 'card cleared';
    card_2.innerHTML = '<span class="fade-out"></span>';
    card_2.className = 'card cleared';
    inPlay.length = 0;
}

function clearBoard() {
    matched.length = 0;
    for (var i = 0; i < deck.length; i++) {
        var card = document.getElementById('card-' + (i + 1));
        card.remove(this);
        if ( i + 1 === deck.length) {
            console.log('reset');
            createDeck();
            dealCards();
        }
    }
}

function init() {
    createDeck();
    dealCards();
}

init();

