/**
 * Stats
 * 
 * Parameters:
 *      - maxLevel (int)
 *      - maxLives (int)
 *      - score (int)
 *      - highScore (int)
 *      - level (int)
 *      - lives (int)
 *      - gameNo (int)
 *      - incorrectRejectionPts (int)
 *      - correctRejectionPts (int)
 *      - pausedLevelEl (span element)
 *      - levelEl (span element)
 *      - scoreEl (span element)
 *
 * 
 * Functions:
 *      - increaseScore(inc)
 *      - loseLife()
 *      - resetStats()
 */

var maxLevel = 3;
var maxLives = 3;

var score = 0;
var highScore = 0;
var level = 1;
var lives = 3;
var gameNo = 0;

var incorrectRejectionPts = -3;
var correctRejectionPts = 2;

var pausedLevelEl;
var levelEl;
var scoreEl;

document.addEventListener("DOMContentLoaded", function(event) {
    pausedLevelEl = document.getElementById("pausedPageLevel");
    levelEl = document.getElementById("gameLevel");
    scoreEl = document.getElementById("gameScore"); 
});

// increases score by given amount and updates the UI
function increaseScore(inc) {
    score += inc;
    scoreEl.innerHTML = score;

    if ((score < 0) && (level > 1)) {
        setGameOver();
    }
}

// lose a life when we take the order of something not on the menu
// game over when we run out of lives
function loseLife() {
    lives--;
    switch (lives) {
        case 2:
            document.getElementById("life1").classList.add("lost-life");
            break;
        case 1:
            document.getElementById("life2").classList.add("lost-life");
            break;
        default:
            if (lives < 1) {
                document.getElementById("life3").classList.add("lost-life");
                setGameOver();
            }
    }
}

// Resets Stats
function resetStats() {
    scoreEl.innerHTML = score;
    levelEl.innerHTML = level;
    pausedLevelEl.innerHTML = level;
    document.getElementById("life1").classList.remove("lost-life");
    document.getElementById("life2").classList.remove("lost-life");
    document.getElementById("life3").classList.remove("lost-life");
}
