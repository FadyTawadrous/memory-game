var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// --- DOM Element References ---
// Use type assertion to specify the element type for TS
var gameBoard = document.getElementById('game-board');
var progressBar = document.getElementById('progress-bar');
var resetButton = document.getElementById('reset-button');
// --- Audio Element References ---
var bgMusic = document.getElementById('bg-music');
var flipSound = document.getElementById('flip-sound');
var matchSound = document.getElementById('match-sound');
var failSound = document.getElementById('fail-sound');
var winSound = document.getElementById('win-sound');
// --- Game Configuration ---
// Image sources
var imageSources = [
    'assets/images/1.jpg', 'assets/images/2.jpg', 'assets/images/3.jpg', 'assets/images/4.jpg',
    'assets/images/5.jpg', 'assets/images/6.jpg', 'assets/images/7.jpg', 'assets/images/8.jpg',
    'assets/images/9.jpg', 'assets/images/10.jpg'
];
var totalPairs = imageSources.length;
var cardDeck = __spreadArray(__spreadArray([], imageSources, true), imageSources, true); // Create 20 cards (10 pairs)
// --- Game State Variables ---
var flippedCards = [];
var score = 0;
var canFlip = true;
var gameStarted = false;
/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param array The array to be shuffled.
 */
function shuffle(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
/**
 * Creates and displays the game cards on the board.
 */
function createBoard() {
    // Reset board and game state
    gameBoard.innerHTML = '';
    flippedCards = [];
    score = 0;
    canFlip = true;
    updateProgressBar();
    shuffle(cardDeck);
    cardDeck.forEach(function (imageSrc, index) {
        var cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        var cardFlipper = document.createElement('div');
        cardFlipper.className = 'card-flipper';
        cardFlipper.dataset.image = imageSrc;
        // Front of card (Number)
        var cardFront = document.createElement('div');
        cardFront.className = 'card-face card-front';
        cardFront.textContent = (index + 1).toString();
        // Back of card (Image)
        var cardBack = document.createElement('div');
        cardBack.className = 'card-face card-back';
        var img = document.createElement('img');
        img.src = imageSrc;
        cardBack.appendChild(img);
        cardFlipper.appendChild(cardFront);
        cardFlipper.appendChild(cardBack);
        cardContainer.appendChild(cardFlipper);
        gameBoard.appendChild(cardContainer);
        cardFlipper.addEventListener('click', function () { return handleCardFlip(cardFlipper); });
    });
}
/**
 * Handles the logic when a card is clicked.
 * @param card The card element that was flipped.
 */
function handleCardFlip(card) {
    // Start background music on the first flip
    if (!gameStarted) {
        gameStarted = true;
        bgMusic.play().catch(function (e) { return console.error("Autoplay was prevented:", e); });
    }
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    flipSound.play();
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}
/**
 * Checks if the two flipped cards are a match.
 */
function checkForMatch() {
    canFlip = false;
    var card1 = flippedCards[0], card2 = flippedCards[1];
    if (card1.dataset.image === card2.dataset.image) {
        // It's a match
        setTimeout(function () {
            matchSound.play();
            score++;
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            canFlip = true;
            updateProgressBar();
            // Check for win condition
            if (score === totalPairs) {
                winSound.play();
                bgMusic.pause();
                // Optionally show a win message
                setTimeout(function () { return alert("You won! Click 'Reset' to play again."); }, 500);
            }
        }, 100);
    }
    else {
        // Not a match
        setTimeout(function () {
            failSound.play();
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 500);
    }
}
/**
 * Updates the score progress bar.
 */
function updateProgressBar() {
    var percentage = totalPairs > 0 ? (score / totalPairs) * 100 : 0;
    progressBar.style.width = "".concat(percentage, "%");
    progressBar.textContent = "".concat(Math.round(percentage), "%");
    progressBar.setAttribute('aria-valuenow', percentage.toString());
}
// --- Event Listeners ---
resetButton.addEventListener('click', function () {
    // Reset and restart
    gameStarted = false;
    bgMusic.pause();
    bgMusic.currentTime = 0;
    createBoard();
});
// --- Initial Game Setup ---
createBoard();
