var data = [
    "Bao Buns",
    "Beef Teriyaki",
    "Bibimbap",
    "Bulgogi",
    "Butter Chicken",
    "Calamari",
    "Carbonara",
    "Carrot Soup",
    "Cheeseburger",
    "Chicken Nuggets",
    "Clam Chowder",
    "Dim Sum",
    "Eggs Benny",
    "Everything Bagel",
    "Fries",
    "Fried Rice",
    "Fruit Salad",
    "Garlic Bread",
    "Grilled Cheese",
    "Gyoza",
    "Jasmine Rice",
    "Kimchi",
    "Lamb Souvlaki",
    "Mac and Cheese",
    "Mango Pudding",
    "Meatball Spaghetti",
    "Pad Thai",
    "Pepperoni Pizza",
    "Pho",
    "Pineapple Rice",
    "Potato Salad",
    "Prawn Tempura",
    "Rotato",
    "Salmon Nigiri",
    "Seafood Pancake",
    "Shio Ramen",
    "Tacos",
    "Takoyaki",
    "Tofu",
    "Yakisoba"
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