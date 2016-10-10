// Defining game board.
var gameBoard =  document.getElementById('game-board');

// Creating cards.
var createCards = function(cardCount){
    for (var i = 0; i < cardCount; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        gameBoard.appendChild(card);
    }
}

createCards(4);