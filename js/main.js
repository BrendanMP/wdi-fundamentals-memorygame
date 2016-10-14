//(function(){})();

var gameBoard = document.getElementById('game-board');
var cardsValues = ["ace", "king", "queen", "jack"];
var card;
var deck = [];
var inPlay = [];


function createDeck() {
    for (var i = 0; i < cardsValues.length; i++) {
        deck.push(cardsValues[i], cardsValues[i]);
    }
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
    card_2.innerHTML = '';
    inPlay.length = 0;
}

function addMatch() {
    var card_1 = document.getElementById(inPlay[0].card.id);
    var card_2 = document.getElementById(inPlay[1].card.id);
    card_1.innerHTML = inPlay[0].card.attribute;
    card_1.removeEventListener('click', flipCard);
    card_2.innerHTML = inPlay[1].card.attribute;
    card_2.removeEventListener('click', flipCard);
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

    if (inPlay.length <= 1) {
        console.log('first card - ' + inPlay[0].card.attribute);
        this.innerHTML = inPlay[0].card.attribute;
    } else if (inPlay.length === 2) {
        console.log('second card - ' + inPlay[1].card.attribute);
        this.innerHTML = inPlay[1].card.attribute;

        if (inPlay[0].card.id === this.id) {
            console.log('- same card!');
            setTimeout(clearCards, 1500);
        } else if (inPlay[0].card.attribute === inPlay[1].card.attribute) {
            console.log('- match!');
            addMatch();
        } else {
            console.log('- no match!');
            setTimeout(clearCards, 1000);
        }

    }
}

createDeck();
dealCards();