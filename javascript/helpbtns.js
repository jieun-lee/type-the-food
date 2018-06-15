/**
 * Help Buttons
 * 
 * Parameters:
 *      - hintUsed (boolean)
 *      - reshuffleUsed (boolean)
 *      - hintBtn (btn element)
 *      - reshuffleBtn (btn element)
 *
 * 
 * Functions:
 *      - getHint()
 *      - reshuffle()
 *      - enableHelpButtons()
 *      - resetHelpButtons()
 */

var hintUsed = false;
var reshuffleUsed = false;

var hintBtn;
var reshuffleBtn;

document.addEventListener("DOMContentLoaded", function(event) {
    hintBtn = document.getElementById("hintButton");
    reshuffleBtn = document.getElementById("reshuffleButton");
});

// If hint is unused, display the menu (max 3 seconds)
function getHint() {
    if (!hintUsed && !isGameOver && (currentPage === "playingPage")) {
        // show modal
        launchModal("hint");

        // configure hint
        hintUsed = true;
        hintBtn.classList.add("btn-disabled");
        hintBtn.innerHTML = "No Hints Left";
    }
}

// If reshuffle is unused, reset all customer orders
function reshuffle() {
    if (!reshuffleUsed && !isGameOver && (currentPage === "playingPage")) {
        reshuffleUsed = true;
        reshuffleBtn.classList.add("btn-disabled");
        reshuffleBtn.innerHTML = "No Shuffles Left";
        for (var i = 0; i < numCustomers; i++) {
            setCustomerOrder(i+1, false);
        }
        inputBox.focus();
    }
}

// Enables/Disables Stat Buttons
function enableHelpButtons(enable) {
    if (enable) {
        hintBtn.classList.remove("btn-disabled");
        reshuffleBtn.classList.remove("btn-disabled");
    } else {
        hintBtn.classList.add("btn-disabled");
        reshuffleBtn.classList.add("btn-disabled");
    }
}

// Resets Hint and Reshuffle Button on Level Up
function resetHelpButtons() {
    hintUsed = false;
    reshuffleUsed = false;
    hintBtn.innerHTML = "Hint";
    reshuffleBtn.innerHTML = "Reshuffle";
    enableHelpButtons(false);
}
