/***************************************************************************
 * MAIN FILE
 ***************************************************************************/



/* ABASTRACTING LINKS AND CAROUSELS
************************************************************************/

var moveL = function(event, collection, $linkCollection) {
    event.stopPropagation();
    event.preventDefault();
    collection.moveLeft();
    $linkCollection.removeClass("selected");
    $linkCollection.eq(collection.currentItemNumber).addClass("selected");
};

var moveR = function(event, collection, $linkCollection) {
    event.stopPropagation();
    event.preventDefault();
    collection.moveRight();
    $linkCollection.removeClass("selected");
    $linkCollection.eq(collection.currentItemNumber).addClass("selected");
};

var changeItem = function(event, collection, $linkCollection) {
    event.stopPropagation();
    event.preventDefault();
    var $nextImage = $(event.target);
    collection.changeItem($nextImage.data("num"));
    $nextImage.removeClass("selected")
    $linkCollection.removeClass("selected");
    $nextImage.addClass("selected");
};





/* SITES CAROUSEL
************************************************************************/

var sitesCarousel = carousel($("#carousel-sites .carousel-item"));
var $sitesLinks = $("#sites-list a");

/* Events Listeners for sites carousel */
$("#sites-carousel_left").click(function(event) {
    moveL(event, sitesCarousel, $sitesLinks);
});

$("#carousel-sites").on( "swipeleft", function(event) {
    moveL(event, sitesCarousel, $sitesLinks);
});

$("#sites-carousel_right").click(function(event) {
	moveR(event, sitesCarousel, $sitesLinks);
});

$("#carousel-sites").on( "swiperight", function(event) {
    moveR(event, sitesCarousel, $sitesLinks);
});

$sitesLinks.click(function(event) {
    changeItem(event, sitesCarousel, $sitesLinks);
});


/* WIDGETS CAROUSEL
************************************************************************/

var widgetsCarousel = carousel($("#carousel-widgets .carousel-item"));
var $widgetsLinks = $("#widgets-list a");

/* Events Listeners for sites carousel */
$("#widgets-carousel_left").click(function(event) {
    moveL(event, widgetsCarousel, $widgetsLinks);
});

$("#carousel-widgets").on( "swipeleft", function(event) {
    moveL(eevent, widgetsCarousel, $widgetsLinks);
});

$("#widgets-carousel_right").click(function(event) {
    moveR(event, widgetsCarousel, $widgetsLinks);
});

$("#carousel-widgets").on( "swiperight", function(event) {
    moveR(event, widgetsCarousel, $widgetsLinks);
});

$widgetsLinks.click(function(event) {
    changeItem(event, widgetsCarousel, $widgetsLinks);
});















