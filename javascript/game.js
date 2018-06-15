// Type the Food
// by: Jieun Lee

var instructionsPage;
var pausedPage;
var playingPage;
var currentPage = "pausedPage";

var pausedLevelEl;
var levelEl;
var scoreEl;
var pausedMenu;
var inputBox;
var hintBtn;
var reshuffleBtn;

var score = 0;
var level = 1;
var maxLevel = 3;
var numCustomers = 6;
var hintUsed = false;
var reshuffleUsed = false;
var isGameOver = false;

var gameLength = 30000; // 30 second games
var incorrectRejectionPts = -1;
var correctRejectionPts = 2;

var customerOrders = {};

document.addEventListener("DOMContentLoaded", function(event) {
    instructionsPage = document.getElementById("instructionsPage");
    pausedPage = document.getElementById("pausedPage");
    playingPage = document.getElementById("playingPage");

    pausedLevelEl = document.getElementById("pausedPageLevel");
    levelEl = document.getElementById("gameLevel");
    scoreEl = document.getElementById("gameScore");
    pausedMenu = document.getElementById("pausedMenuList");
    inputBox = document.getElementById("gameInput");
    hintBtn = document.getElementById("hintButton");
    reshuffleBtn = document.getElementById("reshuffleButton");
})

document.addEventListener("keydown", keyDownHandler, false);

///////////////////////////////////////////////////////////////////
// GAME SETUP
///////////////////////////////////////////////////////////////////

function startApp() {
    startNewGame();
}

function setCurrentPage(page) {
    if (currentPage !== page) {
        switch (currentPage) {
            case "instructionsPage":
                instructionsPage.classList.add("hidden");
                break;
            case "pausedPage":
                pausedPage.classList.add("hidden");
                break;
            case "playingPage":
                playingPage.classList.add("hidden");
                break;
        }
        currentPage = page;
        switch (page) {
            case "instructionsPage":
                toggleInputBox(false);
                instructionsPage.classList.remove("hidden");
                break;
            case "pausedPage":
                toggleInputBox(false);
                pausedPage.classList.remove("hidden");
                break;
            case "playingPage":
                toggleInputBox(true);
                inputBox.focus();
                playingPage.classList.remove("hidden");
                break;
        }
    }
}

// Setup for a New Game
function startNewGame() {
    score = 0;
    numMenuItems = numInitialMenuItems;
    setCurrentPage("pausedPage");
    populateGame();
}

// Setup for the Next Level
function levelUp() {
    level++;
    levelEl.innerHTML = level;
    pausedLevelEl.innerHTML = level;
    numMenuItems += menuIncrement;
    populateGame();
}

// Resets the Menu and Sets Orders for All Customers
function populateGame() {
    resetMenu();
    updateMenuLists();
    resetButtons();
    for (var i = 0; i < numCustomers; i++) {
        setCustomerOrder(i+1, false);
    }
}

function endRound() {
    setCurrentPage("pausedPage");
    if (level < maxLevel) {
        levelUp();
    } else {
        setGameOver();
    }
}

// Game Over State
function setGameOver() {
    isGameOver = true;
    console.log("Game Over!");
}


// increases score by given amount and updates the UI
function increaseScore(inc) {
    score += inc;
    scoreEl.innerHTML = score;
}

///////////////////////////////////////////////////////////////////
// PAUSED PAGE
///////////////////////////////////////////////////////////////////

// Start the Next Round
function startRound() {
    setCurrentPage("playingPage");
    handleTimer();
}

// Update the Paused Page and Hint Pages with New Menu
function updateMenuLists() {

    // remove all existent menu items
    pausedMenu.innerHTML = "";

    // loop through new menu and add nodes for them
    for (var i = 0; i < menu.length; i++) {
        var node = document.createElement("div");
        var menuItem = document.createTextNode(formatDisplayName(menu[i]));
        node.classList.add("game__paused__menu__item");
        node.appendChild(menuItem);
        pausedMenu.appendChild(node);
    }
}

// enables/disables input box
function toggleInputBox(enabled) {
    inputBox.value = "";
    inputBox.disabled = !enabled;
}

///////////////////////////////////////////////////////////////////
// GAME PLAY
///////////////////////////////////////////////////////////////////

// Adds a New Order for the Given Customer
function setCustomerOrder(custNo, delay = true) {
    var timeout = 2000;
    var orderEl = document.getElementById("orderc" + custNo).children[0];

    // remove current order
    customerOrders[custNo] = null;
    orderEl.innerHTML = "";

    // set timeout to 0 if there should not be a delay
    if (!delay) {
        timeout = 0;
    }

    // set new order
    setTimeout(function() {
        var food = getItem();
        customerOrders[custNo] = food;
        orderEl.innerHTML = formatDisplayName(food);
    }, timeout);
}

// Resets Hint and Reshuffle Button
function resetButtons() {
    hintUsed = false;
    reshuffleUsed = false;
    hintBtn.classList.remove("btn-used");
    reshuffleBtn.classList.remove("btn-used");
    hintBtn.innerHTML = "Hint";
    reshuffleBtn.innerHTML = "Reshuffle";
}

// If hint is unused, display the menu (max 3 seconds)
function getHint() {
    if (!hintUsed) {
        alert("hint!");
        hintUsed = true;
        hintBtn.classList.add("btn-used");
        hintBtn.innerHTML = "No Hints Left";
    }
}

// If reshuffle is unused, reset all customer orders
function reshuffle() {
    if (!reshuffleUsed) {
        reshuffleUsed = true;
        reshuffleBtn.classList.add("btn-used");
        reshuffleBtn.innerHTML = "No Shuffles Left";
        for (var i = 0; i < numCustomers; i++) {
            setCustomerOrder(i+1, false);
        }
    }
}

// handles submit when enter is pressed
function handleWordSubmit() {
    var submitted = inputBox.value.toLowerCase();

    // if submitted value is not a number
    if (isNaN(submitted)) {
        var keyFound = false;
        // checks if text is in current list of customer orders
        Object.keys(customerOrders).forEach(function (custId) {
            if ((keyFound === false) && (customerOrders[custId] == submitted)) {
                if (isInMenu(submitted)) {
                    increaseScore(getPts(submitted) * level);
                    setCustomerOrder(custId);
                } else {
                    setGameOver();
                }
                keyFound = true;
            }
        });
    }

    // if submitted value is a number
    else {
        var custId = parseInt(submitted, 10);
        if (custId > 0 && custId <= numCustomers) {
            if (isInMenu(customerOrders[custId])) {
                increaseScore(incorrectRejectionPts);
            } else {
                increaseScore(correctRejectionPts);
                setCustomerOrder(custId);
            }
        }
    }
    inputBox.value = "";
}

// Key Handler
function keyDownHandler(e) {
	if (e.keyCode == 13) {
		// 13 = enter key
		handleWordSubmit();
	}
}

function handleTimer() {
    var timerBar = document.getElementById("timer-bar");
    var percentage = 100;
    var tickLength = gameLength / 400;
    timerBar.style.width = "100%";

    var timer = setInterval(function() {
        percentage = percentage - 0.25;
        timerBar.style.width = percentage + "%";
    }, tickLength);

    setTimeout(function() {
        timerBar.style.width = "0%";
        clearInterval(timer);
        endRound();
    }, gameLength);
}

///////////////////////////////////////////////////////////////////
// START
///////////////////////////////////////////////////////////////////

// Starts the Game Application for the First Time
document.addEventListener("DOMContentLoaded", function(event) {
    startApp();
})