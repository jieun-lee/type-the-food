/**
 * Food
 * 
 * Parameters:
 *      - data ([string])
 *      - menu ([string])
 *      - menuIncrement (int)
 *      - numInitialMenuItems (int)
 *      - numMenuItems (int)
 *      - pausedMenu (div element)
 * 
 * Functions:
 *      - getPts(food)
 *      - isInMenu(food)
 *      - getItem()
 *      - addToMenu(numAdd)
 *      - formatDisplayName(name)
 *      - resetMenu()
 *      - updateMenuLists()
 */

var data = [
    "baguette",
    "bao buns",
    "beef teriyaki",
    "bibimbap",
    "bubble waffle",
    "bulgogi",
    "butter chicken",
    "calamari",
    "california roll",
    "carbonara",
    "carrot soup",
    "cheeseburger",
    "chicken nuggets",
    "clam chowder",
    "crepe",
    "croissant",
    "curry",
    "dim sum",
    "donburi",
    "eggs benny",
    "everything bagel",
    "fish and chips",
    "fries",
    "fried chicken",
    "fried rice",
    "fruit salad",
    "garlic bread",
    "grilled cheese",
    "gyoza",
    "hotdogs",
    "jasmine rice",
    "jelly donut",
    "kimchi",
    "lamb souvlaki",
    "lobster",
    "mac and cheese",
    "mango pudding",
    "meatball spaghetti",
    "nachos",
    "onion rings",
    "pad thai",
    "pepperoni pizza",
    "pho",
    "pineapple rice",
    "pork cutlet",
    "potato salad",
    "poutine",
    "prawn tempura",
    "pumpkin pie",
    "ricecake",
    "rotato",
    "salmon nigiri",
    "seafood pancake",
    "shio ramen",
    "spring rolls",
    "steak",
    "tacos",
    "takoyaki",
    "tater tots",
    "tofu",
    "vongole",
    "wonton soup",
    "yakisoba",
    "yaki udon"
];

var menu = [];
var menuIncrement = 1;
var numInitialMenuItems = 4;
var numMenuItems = numInitialMenuItems;

var pausedMenu;

document.addEventListener("DOMContentLoaded", function(event) {
    pausedMenu = document.getElementById("pausedMenuList");
})

// returns the number of points a food item is worth
function getPts(food) {
    return food.length;
}

// checks if the food item is in the menu
function isInMenu(food) {
    return menu.includes(food);
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
}

// format food name to capitalize first letter of each word
function formatDisplayName(name) {
    var text = name.split(' ');
    for(var i = 0; i < text.length; i++){
        text[i] = text[i].split('');
        text[i][0] = text[i][0].toUpperCase(); 
        text[i] = text[i].join('');
    }
    return text.join(' ');
}

// recreates menu with numMenuItems
function resetMenu() {
    menu = [];
    addToMenu(numMenuItems);
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