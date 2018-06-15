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

var modal;
var hintModal;
var gameOverModal;
var gameOverMsg;
var modalFinalScore;
var modalHighScore;

var score = 0;
var highScore = 0;
var level = 1;
var maxLevel = 3;
var lives = 3;
var maxLives = 3;
var gameNo = 0;

var numCustomers = 6;

var hintUsed = false;
var reshuffleUsed = false;
var isGameOver = false;

var timer = ""; // empty string when timer is not active
var timerBar;
var gameLength = 30000; // 30 second games
var incorrectRejectionPts = -3;
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

    modal = document.getElementById("modal");
    hintModal = document.getElementById("hintModal");
    gameOverModal = document.getElementById("gameOverModal");
    gameOverMsg = document.getElementById("gameOverMsg");
    modalFinalScore = document.getElementById("finalScore");
    modalHighScore = document.getElementById("highScore");

    timerBar = document.getElementById("timerBar");
})

document.addEventListener("keydown", keyDownHandler, false);

///////////////////////////////////////////////////////////////////
// GAME SETUP
///////////////////////////////////////////////////////////////////

// Setup for a New Game
function startNewGame() {
    gameNo++;
    numMenuItems = numInitialMenuItems;
    score = 0;
    level = 1;
    lives = maxLives;
    resetStats();
    setCurrentPage("pausedPage");
    populateGame();
    isGameOver = false;
}

// Resets Stats Bar
function resetStats() {
    scoreEl.innerHTML = score;
    levelEl.innerHTML = level;
    pausedLevelEl.innerHTML = level;
    document.getElementById("life1").classList.remove("lost-life");
    document.getElementById("life2").classList.remove("lost-life");
    document.getElementById("life3").classList.remove("lost-life");
}

// Sets Current Page to Given Page
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

// Resets Hint and Reshuffle Button
function resetButtons() {
    hintUsed = false;
    reshuffleUsed = false;
    hintBtn.innerHTML = "Hint";
    reshuffleBtn.innerHTML = "Reshuffle";
    enableStatButtons(false);
}

// Ends the Current Round
function endRound(timerGameNo) {
    if (!isGameOver && (timerGameNo === gameNo)) {
        if (level < maxLevel) {
            closeModal();
            levelUp();
            setCurrentPage("pausedPage");
        } else {
            setGameOver();
        }
    }
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

///////////////////////////////////////////////////////////////////
// PAUSED PAGE
///////////////////////////////////////////////////////////////////

// Start the Next Round
function startRound() {
    setCurrentPage("playingPage");
    enableStatButtons(true);
    handleTimer();
}

// Enables/Disables Stat Buttons
function enableStatButtons(enable) {
    if (enable) {
        hintBtn.classList.remove("btn-disabled");
        reshuffleBtn.classList.remove("btn-disabled");
    } else {
        hintBtn.classList.add("btn-disabled");
        reshuffleBtn.classList.add("btn-disabled");
    }
}

// Update the Paused Page and Hint Pages with New Menu
function updateMenuLists() {

    // remove all existent menu items
    pausedMenu.innerHTML = "";
    for (var i = 0; i < 8; i++) {
        document.getElementById("hintItem" + (i+1)).innerHTML = "";
    }

    // loop through new menu
    for (var i = 0; i < menu.length; i++) {
        // get formatted menu item
        var menuItem = formatDisplayName(menu[i]);

        // change text on hint page menu
        document.getElementById("hintItem" + (i+1)).innerHTML = menuItem;

        // add new nodes for paused page menu
        var node = document.createElement("div");
        var textNode = document.createTextNode(menuItem);
        node.classList.add("game__paused__menu__item");
        node.appendChild(textNode);
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

// increases score by given amount and updates the UI
function increaseScore(inc) {
    score += inc;
    scoreEl.innerHTML = score;
}

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

    if (isGameOver) {
        startNewGame();
    }
}

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
                    loseLife();
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
        stopTimer();
        endRound(currentGame);
    }, gameLength);
}

///////////////////////////////////////////////////////////////////
// START
///////////////////////////////////////////////////////////////////

// Starts the Game Application for the First Time
document.addEventListener("DOMContentLoaded", function(event) {
    startNewGame();
})