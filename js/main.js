// Assigning values to card variables.
var cardOne = 'queen';
var cardTwo = 'queen';
var cardThree = 'king';
var cardFour = 'king';

var choiceOne = cardOne;
var choiceTwo = cardFour;

if (choiceOne === cardOne && choiceTwo === cardTwo) {
    alert('It\'s a match');
} else if (choiceOne === cardThree && choiceTwo === cardFour) {
    alert('It\'s a match');
} else {
    alert('Sorry Try Again');
}