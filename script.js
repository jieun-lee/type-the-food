// Type the Food
// by: Jieun Lee

var scoreCanvas = document.getElementById("scoreCanvas");
var gameCanvas = document.getElementById("gameCanvas");
var typingCanvas = document.getElementById("typingCanvas");
var scoreCtx = scoreCanvas.getContext("2d");
var gameCtx = gameCanvas.getContext("2d");
var typingCtx = typingCanvas.getContext("2d");

var screenWidth = gameCanvas.width;
var screenHeight = gameCanvas.height;
var scoreBoardHeight = scoreCanvas.height;
var typingBoardHeight = typingCanvas.height;

document.addEventListener("keydown", keyDownHandler, false);

var level = 1;
var score = 0;
var isGameOver = false;