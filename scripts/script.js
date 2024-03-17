// Variables for game elements
var wordDisplay = document.querySelector(".word-display");
var guessesText = document.querySelector(".guesses-text b");
var hangmanImage = document.querySelector(".hangman-box img");
var keyboardDiv = document.querySelector(".keyboard");
var gameModal = document.querySelector(".game-modal");
var playAgainBtn = gameModal.querySelector("button");

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
    var modalText = isVictory ? "You found the word:" : "The correct word was:";
    gameModal.querySelector("img").src = "images/" + (isVictory ? "victory" : "lost") + ".gif";
    gameModal.querySelector("h4").innerText = isVictory ? "Shinobi Triumph!" : "Ninja Defeated...";
    gameModal.querySelector("p").innerHTML = modalText + " <b>" + currentWord + "</b>";
    gameModal.style.opacity = "1";
    gameModal.style.pointerEvents = "auto";
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
        gameOver(false);
    }

    if (correctGuessCount === currentWord.length) {
        gameOver(true);
    }
}

getRandomWord();