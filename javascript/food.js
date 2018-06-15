var data = [
    "bao buns",
    "beef teriyaki",
    "bibimbap",
    "bulgogi",
    "butter chicken",
    "calamari",
    "carbonara",
    "carrot soup",
    "cheeseburger",
    "chicken nuggets",
    "clam chowder",
    "dim sum",
    "eggs benny",
    "everything bagel",
    "fries",
    "fried rice",
    "fruit salad",
    "garlic bread",
    "grilled cheese",
    "gyoza",
    "jasmine rice",
    "kimchi",
    "lamb souvlaki",
    "mac and cheese",
    "mango pudding",
    "meatball spaghetti",
    "pad thai",
    "pepperoni pizza",
    "pho",
    "pineapple rice",
    "potato salad",
    "prawn tempura",
    "rotato",
    "salmon nigiri",
    "seafood pancake",
    "shio ramen",
    "tacos",
    "takoyaki",
    "tofu",
    "yakisoba"
];

var menu = [];
var numInitItems = 6;
var menuIncrement = 2;


// returns the number of points a food item is worth
function getPts(food) {
    return food.length;
}

// checks if the food item is in the menu
function isInMenu(food) {
    return menu.includes(food);
}

// check if the food item is in the list of all foods
function isInFoodList(food) {
    return data.includes(food);
}

// returns an item on the menu or a random item
function getItem() {
    if (Math.random() >= 0.5) {
        var index = Math.floor(Math.random() * menu.length);
        return menu[index];
    } else {
        var index = Math.floor(Math.random() * data.length);
        return data[index];
    }
}

// adds given number of items to the menu
function addToMenu(numAdd) {
    var index;

    for (var i = 0; i < numAdd; i++) {
        // stop if the menu already contains all items
        if (menu.length >= data.length) {
            break;
        }

        // check if the food item is already on the menu
        do {
            index = Math.floor(Math.random() * data.length);
        } while (isInMenu(data[index]));

        menu.push(data[index]);
    }
    console.log(menu);
}

// initializes the menu
function initializeMenu() {
    menu = [];
    addToMenu(numInitItems);
}

initializeMenu();