// Main Game

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