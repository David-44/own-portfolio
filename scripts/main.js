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

var changeSelected = function(event, collection, $container, $links) {
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





/* SITES CAROUSEL
************************************************************************/

$("#sites-carousel_left").click(function(event) {
    sitesCarousel.moveLeft();
    changeSelected(event, sitesCarousel, $widgetsContainer, $sitesLinks);
});

$("#carousel-sites").on( "swipeleft", function(event) {
    sitesCarousel.moveLeft();
    changeSelected(event, sitesCarousel, $widgetsContainer, $sitesLinks);
});

$("#sites-carousel_right").click(function(event) {
    sitesCarousel.moveRight();
	changeSelected(event, sitesCarousel, $widgetsContainer, $sitesLinks);
});

$("#carousel-sites").on( "swiperight", function(event) {
    sitesCarousel.moveRight();
    changeSelected(event, sitesCarousel, $widgetsContainer, $sitesLinks);
});

$sitesLinks.click(function(event) {
    sitesCarousel.changeItem($(event.target).data("num"));
    changeSelected(event, sitesCarousel, $widgetsContainer, $sitesLinks);
});





/* WIDGETS CAROUSEL
************************************************************************/

$("#widgets-carousel_left").click(function(event) {
    widgetsCarousel.moveLeft();
    changeSelected(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
});

$("#carousel-widgets").on( "swipeleft", function(event) {
    widgetsCarousel.moveLeft();
    changeSelected(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
});

$("#widgets-carousel_right").click(function(event) {
    widgetsCarousel.moveRight();
    changeSelected(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
});

$("#carousel-widgets").on( "swiperight", function(event) {
    widgetsCarousel.moveRight();
    changeSelected(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
});

$widgetsLinks.click(function(event) {
    widgetsCarousel.changeItem($(event.target).data("num"));
    changeSelected(event, widgetsCarousel, $sitesContainer, $widgetsLinks);
});















