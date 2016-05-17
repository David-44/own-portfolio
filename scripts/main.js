/***************************************************************************
 * MAIN FILE
 ***************************************************************************/


var sitesCarousel = carousel($("#carousel-sites .carousel-sites-item"));
var $sitesLinks = $("#sites-list a");

/* Events Listeners for sites carousel */
$("#sites-carousel_left").click(function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveLeft();
    $sitesLinks.removeClass("selected");
    $sitesLinks.eq(sitesCarousel.currentItemNumber).addClass("selected");
});

$("#sites-carousel_right").click(function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveRight();
    $sitesLinks.removeClass("selected");
    $sitesLinks.eq(sitesCarousel.currentItemNumber).addClass("selected");
});

$sitesLinks.click(function(event) {
    event.stopPropagation();
    event.preventDefault();
    var $nextImage = $(event.target);
    sitesCarousel.changeItem($nextImage.data("site-num"));
    $nextImage.removeClass("selected")
    $sitesLinks.removeClass("selected");
    $nextImage.addClass("selected");
});