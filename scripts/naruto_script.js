// Variables for game elements
var wordDisplay = document.querySelector(".word-display");
var guessesText = document.querySelector(".guesses-text b");
var hangmanImage = document.querySelector(".hangman-box img");
var keyboardDiv = document.querySelector(".keyboard");
var gameModal = document.querySelector(".game-modal");
var playAgainBtn = gameModal.querySelector("button");
var pausemenu = document.querySelector(".pause-menu-box")
var score = document.querySelector(".score")

// Game variables
var currentWord, wrongGuessCount;
var maxGuesses = 6;
var correctGuessCount = 0;

// Function to reset the game
function resetGame() {
    correctGuessCount = 0;
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = wrongGuessCount + " / " + maxGuesses;

    // Display blank spaces for the word
    wordDisplay.innerHTML = "";
    for (var i = 0; i < currentWord.length; i++) {
        var li = document.createElement("li");
        li.className = "letter";
        wordDisplay.appendChild(li);
    }

    // Enable all keyboard buttons
    var buttons = keyboardDiv.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

    gameModal.style.opacity = "0";
    gameModal.style.pointerEvents = "none";
}

// Function to get a random word
function getRandomWord() {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var randomWordObject = wordList[randomIndex];
    currentWord = randomWordObject.word.toLowerCase();
    document.querySelector(".hint-text b").innerText = randomWordObject.hint;
    resetGame();
}

// Function to handle game over
function gameOver(isVictory) {
    if (isVictory) {
        score.innerText = parseInt(score.innerText) + 10; // Increase score by 10 on every correct guess
        getRandomWord()
    }
    if(!isVictory){
        var modalText = "The correct word was:";
        gameModal.querySelector("img").src = "images/lost.gif";
        gameModal.querySelector("h4").innerText = "Defeated...";
        gameModal.querySelector("p").innerHTML = modalText + " <b>" + currentWord + "</b>";
        gameModal.style.opacity = "1";
        gameModal.style.pointerEvents = "auto";
    }
}

// Function to initialize the game on button click
function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === clickedLetter) {
                var li = wordDisplay.querySelectorAll("li")[i];
                li.innerText = clickedLetter;
                li.style.margin = "-40px 0 35px";
                li.style.borderColor = "transparent";
                li.style.color = "green";
                correctGuessCount++;  // Increment correctGuessCount
            }
        }
    } else {
        wrongGuessCount++;
        hangmanImage.src = "images/hangman-" + wrongGuessCount + ".svg";
    }

    button.disabled = true;
    guessesText.innerText = wrongGuessCount + " / " + maxGuesses;

    if (wrongGuessCount === maxGuesses) {
        score.innerHTML="0"
        gameOver(false);
    }

    if (correctGuessCount === currentWord.length) {
        setTimeout(function() {
            li.style.color = "green";
            gameOver(true);
        }, 1000); 
    }
}
function pausegame(){
    pausemenu.style.opacity = "1";
    pausemenu.style.pointerEvents = "auto";
}
function resume(){
    pausemenu.style.opacity = "0";
    pausemenu.style.pointerEvents = "none";
}
function restart(){
    score.innerHTML="0"
    getRandomWord()
    pausemenu.style.opacity = "0";
    pausemenu.style.pointerEvents = "none";
}
getRandomWord();