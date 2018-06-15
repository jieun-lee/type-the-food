/**
 * Game
 * 
 * Parameters:
 *      - isGameOver (boolean)
 * 
 * Functions:
 *      - startNewGame()
 *      - populateRound()
 *      - startRound()
 *      - endRound(timerGameNo)
 *      - levelUp()
 *      - setGameOver()
 */

var isGameOver = false;

// Setup for a New Game
function startNewGame() {
    gameNo++;
    numMenuItems = numInitialMenuItems;
    score = 0;
    level = 1;
    lives = maxLives;
    resetStats();
    setCurrentPage("pausedPage");
    populateRound();
    isGameOver = false;
}

// Resets the Menu and Sets Orders for All Customers
function populateRound() {
    resetMenu();
    updateMenuLists();
    resetHelpButtons();
    for (var i = 0; i < numCustomers; i++) {
        setCustomerOrder(i+1, false);
    }
}

// Start the Next Round
function startRound() {
    setCurrentPage("playingPage");
    enableHelpButtons(true);
    handleTimer();
}

// Ends the Current Round
function endRound(timerGameNo) {
    if (!isGameOver && (timerGameNo === gameNo)) {
        stopTimer();
        if (level < maxLevel) {
            closeModal();
            levelUp();
            setCurrentPage("pausedPage");
        } else {
            setGameOver();
        }
    }
}

// Setup for the Next Level
function levelUp() {
    level++;
    levelEl.innerHTML = level;
    pausedLevelEl.innerHTML = level;
    numMenuItems += menuIncrement;
    populateRound();
}

// Game Over State
function setGameOver() {
    isGameOver = true;
    stopTimer();
    modalFinalScore.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        modalHighScore.innerHTML = highScore;
    }
    // launch game over modal
    launchModal("gameOver");
}

// Starts the Game Application for the First Time
document.addEventListener("DOMContentLoaded", function(event) {
    startNewGame();
})