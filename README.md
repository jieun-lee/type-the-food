# Type the Food
Game made with JavaScript that involves typing food names as fast as possible.


### Scenario
* You are a server at a restaurant.
* Customers will order food, but only some of the orders will actually be from the menu.
* Your task is to take their order if it is on the menu, and reject it if it is not.


### Game Instructions
* At the start of each level, you will be given a list of menu items.
* Memorize these - you won't be able to see them during the game!
* Type the name of the food items ordered by the customers that were on the menu.
* Type the customer's number if they ordered something that wasn't on the menu.
* Press the Enter key after typing something to submit - typing something that isn't a customer number or not being ordered will have no effect on the game.
* You will be given one hint at each level/round - this is a chance to take another look at the menu. However, you will not be able to take orders (type) while viewing the menu.
* You will be given one reshuffle at each level/round - that is, a chance to get all customers to make a new order.
* There are three levels total, with 4, 6, and 8 menu items respectively. Some of these menu items may overlap, but most of them will be reset at each stage.
* Each level is 30 seconds long.


### Points
These points will be multiplied by your current level number (i.e. the points awarded for a correct rejection in level 3 would be 6 points).

* Points awarded for a correct order: length of the food name (including spaces)
* Points awarded for a correct rejection (customer number typing): 2
* Points deducted for an incorrect rejection (type customer number when they ordered from the menu): 5
* Penalty for incorrect order (type food name that wasn't on the menu): lose 1 life

You have 3 lives total for the entire game (i.e. for all 3 levels); the game will end when you run out of lives.
The game will also end if you end up with negative points (i.e. lose too many points from incorrect rejections) starting from level 2.


### Further Improvements
"Type the Food" is still in development, and I am working to develop more features such as:

* Writing instructions
* Feedback on point system (show what is being added/subtracted)
* Improving the overall look and design (customer images, button hovering, order highlighting)
* Time Limit on order (not confirmed)

I would highly appreciate it if you could fill out this feedback form after trying out the game, as it would help me make this game better :) Thank you!
* https://goo.gl/forms/L914CQ0pzfxPUAep1