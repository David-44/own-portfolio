/***************************************************************************
 * MAIN FILE
 ***************************************************************************/


var sitesCarousel = carousel(document.getElementById("carousel-sites"));
var sitesLinks = document.querySelectorAll("#sites-list a");

/* Events Listeners for sites carousel */
document.getElementById("sites-carousel_left").addEventListener("click", function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveLeft();
	helpers.removeAllClass(document.getElementById("sites-list"), "selected");
    sitesLinks[sitesCarousel.currentItemNumber].classList.add("selected");
});

document.getElementById("sites-carousel_right").addEventListener("click", function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveRight();
	helpers.removeAllClass(document.getElementById("sites-list"), "selected");
    sitesLinks[sitesCarousel.currentItemNumber].classList.add("selected");
});

document.getElementById("sites-list").addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var nextImage = event.target.dataset.siteNum;
    if (nextImage) {
        sitesCarousel.changeItem(nextImage);
        helpers.removeAllClass(this, "selected");
        event.target.classList.add("selected");
    }
});