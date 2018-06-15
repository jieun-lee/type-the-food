// Type the Food

// DOM Selectors

var levelEl;
var scoreEl;
var inputBox;

document.addEventListener("DOMContentLoaded", function(event) {
    // given as a string; use parseInt(levelEl) to get the value
    levelEl = document.getElementById("gameLevel").innerHTML;
    scoreEl = document.getElementById("gameScore").innerHTML;
    inputBox = document.getElementById("gameInput");
})

document.addEventListener("keydown", keyDownHandler, false);

/////////////////////////////////////////////////////////////

// Game Setup

var score = 0;
var isGameOver = false;

var level = 1;
var numMenuItems;
var numCustomers;

var customerOrders = {};

// var menuIncrement = 2;
var customerIncrement = 2;

var initialMenuItems = 8;
var initialCustomers = 6;

// Restart the Game
function setup() {
    score = 0;
    numMenuItems = initialMenuItems;
    numCustomers = initialCustomers;

    for (var i = 0; i < numCustomers; i++) {
        setCustomerOrder(i+1);
    }
}

// Level Up
function levelUp() {
    numMenuItems += menuIncrement;
    numCustomers += customerIncrement;
}

// Adds a New Order for the Customer
function setCustomerOrder(custNo) {
    var food = getItem();
    customerOrders[custNo] = food;

    // Display on Screen
    var foodText = food.split(' ');
    for(var i = 0; i < foodText.length; i++){
        foodText[i] = foodText[i].split('');
        foodText[i][0] = foodText[i][0].toUpperCase(); 
        foodText[i] = foodText[i].join('');
    }
    document.getElementById("orderc" + custNo).children[0].innerHTML = foodText.join(' ');
}

// Game Over State
function setGameOver() {
    isGameOver = true;
    console.log("Game Over!");
}

document.addEventListener("DOMContentLoaded", function(event) {
    setup();
})

/////////////////////////////////////////////////////////////

// During Game

// increases score by given amount and updates the UI
function increaseScore(inc) {
    score += inc;
    console.log("score is now " + score);
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
                setGameOver();
            } else {
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