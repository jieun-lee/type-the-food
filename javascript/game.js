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

function setCustomerOrder(custNo) {
    var food = getItem().split(' ');
    for(var i = 0; i < food.length; i++){
        food[i] = food[i].split('');
        food[i][0] = food[i][0].toUpperCase(); 
        food[i] = food[i].join('');
    }
    document.getElementById("orderc" + custNo).children[0].innerHTML = food.join(' ');
}

document.addEventListener("DOMContentLoaded", function(event) {
    setup();
})

/////////////////////////////////////////////////////////////

// During Game

function handleWordSubmit() {
    var submitted = inputBox.value;
    console.log(submitted);
    inputBox.value = "";
}

// Key Handler
function keyDownHandler(e) {
	if (e.keyCode == 13) {
		// 13 = enter key
		handleWordSubmit();
	}
}