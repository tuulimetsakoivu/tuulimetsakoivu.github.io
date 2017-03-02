function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var numberToGuess = 0;

window.onload   = function() {
    numberToGuess = getRandomInteger(1, 10);
    document.getElementById("button").addEventListener("click", function(){
    guessTheNumber();
    });
};

function compareNumbers(first, second) {
    if (first == second) {
        return true;
    } else {
        return false;
    }
}

var comparedInt = 1;

function guessTheNumber() {
    var guessed = document.getElementById("number").value;
    if (1 <= guessed && guessed <= 10 && guessed % 1 == 0){
        if (compareNumbers(numberToGuess, guessed)){
            window.alert("You are correct!");
        } else {
            window.alert("Your guess was false!");
        }
    } else {
        window.alert("Your guess must be an integer between 1 and 10.");
    }
    numberToGuess = getRandomInteger(1, 10);
}





