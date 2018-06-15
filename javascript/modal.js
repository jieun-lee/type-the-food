/**
 * Modal
 * 
 * Parameters:
 *      - modal (div element)
 *      - hintModal (div element)
 *      - gameOverModal (div element)
 *      - gameOverMsg (div element)
 *      - modalFinalScore (span element)
 *      - modalHighScore (span element)
 * 
 * Functions:
 *      - launchModal(type)
 *      - closeModal()
 */

var modal;
var hintModal;
var gameOverModal;
var gameOverMsg;
var modalFinalScore;
var modalHighScore;

document.addEventListener("DOMContentLoaded", function(event) {
    modal = document.getElementById("modal");
    hintModal = document.getElementById("hintModal");
    gameOverModal = document.getElementById("gameOverModal");
    gameOverMsg = document.getElementById("gameOverMsg");
    modalFinalScore = document.getElementById("finalScore");
    modalHighScore = document.getElementById("highScore");
});

// Launches Modal of Given Type
function launchModal(type = "hint") {
    toggleInputBox(false);
    modal.classList.remove("hidden");

    // launch Hint Modal (type === "gameOver")
    if (type === "gameOver") {
        gameOverModal.classList.remove("hidden");
        if (lives <= 0) {
            gameOverMsg.innerHTML = "No more lives";
        } else if (level >= maxLevel) {
            gameOverMsg.innerHTML = "All 3 Levels Complete!";
        } else if ((score < 0) && level > 1) {
            gameOverMsg.innerHTML = "Lost too many points";
        } else {
            gameOverMsg.innerHTML = "";
        }
    }
    // launch Game Over Modal (type === "hint")
    else {
        hintModal.classList.remove("hidden");
    }
}

// Closes the Modal; if Game Over, starts a new game
function closeModal() {
    modal.classList.add("hidden");
    hintModal.classList.add("hidden");
    gameOverModal.classList.add("hidden");
    toggleInputBox(true);
    inputBox.focus();

    if (isGameOver) {
        startNewGame();
    }
}