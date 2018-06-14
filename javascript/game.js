// Type the Food

var inputBox = document.getElementById("gameInput");

document.addEventListener("keydown", keyDownHandler, false);

/////////////////////////////////////////////////////////////

// Game Setup

var score = 0;
var isGameOver = false;

var level = 1;
var numMenuItems;
var numCustomers;

var menuIncrement = 2;
var customerIncrement = 2;

var initialMenuItems = 8;
var initialCustomers = 6;

// Restart the Game
function setup() {
    score = 0;
    numMenuItems = initialMenuItems;
    numCustomers = initialCustomers;
}

// Level Up
function levelUp() {
    numMenuItems += menuIncrement;
    numCustomers += customerIncrement;
}

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