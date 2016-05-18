/***************************************************************************
 * MAIN FILE
 ***************************************************************************/





/* CAROUSEL ELEMENTS
************************************************************************/

var $sitesContainer = $("#sites-container"),
      sitesCarousel = carousel($("#carousel-sites .carousel-item")),
        $sitesLinks = $("#sites-list a"),

  $widgetsContainer = $("#widgets-container"),
    widgetsCarousel = carousel($("#carousel-widgets .carousel-item")),
      $widgetsLinks = $("#widgets-list a");





/* ABASTRACTING LINKS AND CAROUSELS
************************************************************************/

var changeSelectedLink = function(event, collection, $container, $links) {
    event.stopPropagation();
    event.preventDefault();

    $widgetsLinks.removeClass("selected");
    $sitesLinks.removeClass("selected");
    $links.eq(collection.currentItemNumber).addClass("selected");

    if (!$container.hasClass("hidden-medium")) {
        $sitesContainer.removeClass("hidden-medium");
        $widgetsContainer.removeClass("hidden-medium");
        $container.addClass("hidden-medium");
    }
};

var changeSelectedSite = function() {
    changeSelectedLink(event, sitesCarousel, $widgetsContainer, $sitesLinks);
};

var changeSelectedWidget = function() {
    changeSelectedLink(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
};




/* SITES CAROUSEL
************************************************************************/

$("#sites-carousel_left").click(function(event) {
    sitesCarousel.moveLeft();
    changeSelectedSite();
});

$("#carousel-sites").on( "swipeleft", function(event) {
    sitesCarousel.moveLeft();
    changeSelectedSite();
});

$("#sites-carousel_right").click(function(event) {
    sitesCarousel.moveRight();
	changeSelectedSite();
});

$("#carousel-sites").on( "swiperight", function(event) {
    sitesCarousel.moveRight();
    changeSelectedSite();
});

$sitesLinks.click(function(event) {
    sitesCarousel.changeItem($(event.target).data("num"));
    changeSelectedSite();
});





/* WIDGETS CAROUSEL
************************************************************************/

$("#widgets-carousel_left").click(function(event) {
    widgetsCarousel.moveLeft();
    changeSelectedWidget();
});

$("#carousel-widgets").on( "swipeleft", function(event) {
    widgetsCarousel.moveLeft();
    changeSelectedWidget();
});

$("#widgets-carousel_right").click(function(event) {
    widgetsCarousel.moveRight();
    changeSelectedWidget();
});

$("#carousel-widgets").on( "swiperight", function(event) {
    widgetsCarousel.moveRight();
    changeSelectedWidget();
});

$widgetsLinks.click(function(event) {
    widgetsCarousel.changeItem($(event.target).data("num"));
    changeSelectedWidget();
});















