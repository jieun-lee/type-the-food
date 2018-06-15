/**
 * Timer
 * 
 * Parameters:
 *      - timer (string | int)
 *      - timerBar (div element)
 *      - gameLength (int)
 * 
 * Functions:
 *      - stopTimer()
 *      - handleTimer()
 */

var timer = ""; // empty string when timer is not active
var timerBar;
var gameLength = 30000; // 30 second games

document.addEventListener("DOMContentLoaded", function(event) {
    timerBar = document.getElementById("timerBar");
});


// Stops the Timer
function stopTimer() {
    if (timer !== "") {
        timerBar.style.width = "0%";
        clearInterval(timer);
        timer = "";
    }
}

// Handles Timer Bar
function handleTimer() {
    var currentGame = gameNo;
    var percentage = 100;
    var tickLength = gameLength / 400;
    timerBar.style.width = "100%";

    timer = setInterval(function() {
        percentage = percentage - 0.25;
        timerBar.style.width = percentage + "%";
    }, tickLength);

    setTimeout(function() {
        endRound(currentGame);
    }, gameLength);
}