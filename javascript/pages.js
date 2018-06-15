/**
 * Pages
 * 
 * Parameters:
 *      - instructionsPage (div element)
 *      - pausedPage (div element)
 *      - playingPage (div element)
 *      - currentPage (string)
 * 
 * Functions:
 *      - setCurrentPage(page)
 */

var instructionsPage;
var pausedPage;
var playingPage;
var currentPage = "pausedPage";

document.addEventListener("DOMContentLoaded", function(event) {
    instructionsPage = document.getElementById("instructionsPage");
    pausedPage = document.getElementById("pausedPage");
    playingPage = document.getElementById("playingPage");
});

// Sets Current Page to Given Page
function setCurrentPage(page) {
    if (currentPage !== page) {
        switch (currentPage) {
            case "instructionsPage":
                instructionsPage.classList.add("hidden");
                break;
            case "pausedPage":
                pausedPage.classList.add("hidden");
                break;
            case "playingPage":
                playingPage.classList.add("hidden");
                break;
        }
        currentPage = page;
        switch (page) {
            case "instructionsPage":
                toggleInputBox(false);
                instructionsPage.classList.remove("hidden");
                break;
            case "pausedPage":
                toggleInputBox(false);
                pausedPage.classList.remove("hidden");
                break;
            case "playingPage":
                toggleInputBox(true);
                inputBox.focus();
                playingPage.classList.remove("hidden");
                break;
        }
    }
}