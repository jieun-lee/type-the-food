// Type the Food
// by: Jieun Lee

var levelEl;
var scoreEl;
var inputBox;

var level = 1;
var score = 0;
var numCustomers = 6;
var isGameOver = false;

var incorrectRejectionPts = -1;
var correctRejectionPts = 2;

var customerOrders = {};

document.addEventListener("DOMContentLoaded", function(event) {
    levelEl = document.getElementById("gameLevel");
    scoreEl = document.getElementById("gameScore");
    inputBox = document.getElementById("gameInput");
})

document.addEventListener("keydown", keyDownHandler, false);


// Setup for a New Game
function startNewGame() {
    score = 0;
    numMenuItems = numInitialMenuItems;
    populateGame();
}

// Setup for the Next Level
function levelUp() {
    level++;
    levelEl.innerHTML = level;
    numMenuItems += menuIncrement;
    populateGame();
}

// Resets the Menu and Sets Orders for All Customers
function populateGame() {
    resetMenu();
    for (var i = 0; i < numCustomers; i++) {
        setCustomerOrder(i+1, false);
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


// Adds a New Order for the Given Customer
function setCustomerOrder(custNo, delay = true) {
    var timeout = 2000;
    var orderEl = document.getElementById("orderc" + custNo).children[0];

    // remove current order
    customerOrders[custNo] = null;
    orderEl.innerHTML = "";

    // get new food item
    var food = getItem();
    var foodText = food.split(' ');
    for(var i = 0; i < foodText.length; i++){
        foodText[i] = foodText[i].split('');
        foodText[i][0] = foodText[i][0].toUpperCase(); 
        foodText[i] = foodText[i].join('');
    }

    // set timeout to 0 if there should not be a delay
    if (!delay) {
        timeout = 0;
    }

    // set new order
    setTimeout(function() {
        customerOrders[custNo] = food;
        orderEl.innerHTML = foodText.join(' ');
    }, timeout);
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


// Starts the Game
document.addEventListener("DOMContentLoaded", function(event) {
    startNewGame();
})