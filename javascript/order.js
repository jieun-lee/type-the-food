/**
 * Order
 * 
 * Parameters:
 *      - numCustomers (int)
 *      - customerOrders ({int: string})
 *      - inputBox (input element)
 * 
 * Functions:
 *      - setCustomerOrder(custNo, delay)
 *      - toggleCustomerImg(custNo, ordering)
 *      - handleWordSubmit()
 *      - toggleInputBox()
 *      - keyDownHandler()
 */

var numCustomers = 6;
var customerOrders = {};

var inputBox;

document.addEventListener("DOMContentLoaded", function(event) {
    inputBox = document.getElementById("gameInput");
});

// adds a new order for the given customer
function setCustomerOrder(custNo, delay = true) {
    var timeout = 2000;
    var orderEl = document.getElementById("orderc" + custNo);

    // remove current order
    customerOrders[custNo] = null;
    orderEl.classList.add("invisible");
    toggleCustomerImg(custNo, false);

    // set timeout to 0 if there should not be a delay
    if (!delay) {
        timeout = 0;
    }

    // set new order
    setTimeout(function() {
        var food = getItem();
        customerOrders[custNo] = food;
        toggleCustomerImg(custNo, true);
        orderEl.classList.remove("invisible");
        orderEl.children[0].innerHTML = formatDisplayName(food);
    }, timeout);
}

// sets the given customer's image to given state (ordering vs menu)
function toggleCustomerImg(custNo, ordering = true) {
    var custEl = document.getElementById("cust" + custNo + "-img");
    if (ordering) {
        custEl.src = "images/char" + custNo + "-order.jpg";
    } else {
        custEl.src = "images/char" + custNo + "-menu.jpg";
    }
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
                    increaseScore(getPts(submitted));
                    setCustomerOrder(custId);
                } else {
                    loseLife();
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

// enables/disables input box
function toggleInputBox(enabled) {
    inputBox.value = "";
    inputBox.disabled = !enabled;
}

// key handler
function keyDownHandler(e) {
	if (e.keyCode == 13) {
		// 13 = enter key
		handleWordSubmit();
	}
}
document.addEventListener("keydown", keyDownHandler, false);