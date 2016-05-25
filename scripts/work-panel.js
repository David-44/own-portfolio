/***************************************************************************
 * OPERATING THE CAROUSEL AND LINKS ON THE WORK PANEL
 ***************************************************************************

/* OPERATION VARIABLES
************************************************************************/

var timing = 500;






/* CAROUSEL ELEMENTS
************************************************************************/

    $sitesContainer = $("#sites-container"),
      sitesCarousel = new Carousel($("#carousel-sites .carousel-item"), timing),
        $sitesLinks = $("#sites-list .js-work-link"),

  $widgetsContainer = $("#widgets-container"),
    widgetsCarousel = new Carousel($("#carousel-widgets .carousel-item"), timing),
      $widgetsLinks = $("#widgets-list .js-work-link"),

    currentCarousel = sitesCarousel;




/* ABSTRACTING LINKS AND CAROUSELS
************************************************************************/

var changeSelectedLink = function(collection, $container, $links, event) {
    event.stopPropagation();
    event.preventDefault();

    $widgetsLinks.removeClass("is-selected");
    $sitesLinks.removeClass("is-selected");
    $links.eq(collection.currentItemNumber).addClass("is-selected");

    // if (!$container.hasClass("hidden-medium")) {
    //     setTimeout(function() {
    //         $sitesContainer.removeClass("hidden-medium");
    //         $widgetsContainer.removeClass("hidden-medium");
    //         $container.addClass("hidden-medium");
    //     }, 500);
    // }
};

var changeSelectedSite = function(event) {
    changeSelectedLink(sitesCarousel, $widgetsContainer, $sitesLinks, event);
};

var changeSelectedWidget = function(event) {
    changeSelectedLink(widgetsCarousel, $sitesContainer, $widgetsLinks, event);
};




/* SITES CAROUSEL EVENT LISTENERS
************************************************************************/

$("#sites-carousel_left").click(function(event) {
    sitesCarousel.moveLeft(event);
    changeSelectedSite(event);
});

$("#carousel-sites").on( "swipeleft", function(event) {
    sitesCarousel.moveLeft(event);
    changeSelectedSite(event);
});

$("#sites-carousel_right").click(function(event) {
    sitesCarousel.moveRight(event);
	changeSelectedSite(event);
});

$("#carousel-sites").on( "swiperight", function(event) {
    sitesCarousel.moveRight(event);
    changeSelectedSite(event);
});

$sitesLinks.click(function(event) {
    changeSelectedSite(event);
    sitesCarousel.changeItem($(event.target).data("num"), "blur-out", "blur-in");
    if (sitesCarousel !== currentCarousel) {
        widgetsCarousel.blurCurrentItem("blur-out");
        setTimeout(function() {
            $widgetsContainer.addClass("hidden-medium");
            $sitesContainer.removeClass("hidden-medium");
        }, timing);
        currentCarousel = sitesCarousel;
    }
});





/* WIDGETS CAROUSEL EVENT LISTENERS
************************************************************************/

$("#widgets-carousel_left").click(function(event) {
    widgetsCarousel.moveLeft(event);
    changeSelectedWidget(event);
});

$("#carousel-widgets").on( "swipeleft", function(event) {
    widgetsCarousel.moveLeft(event);
    changeSelectedWidget(event);
});

$("#widgets-carousel_right").click(function(event) {
    widgetsCarousel.moveRight(event);
    changeSelectedWidget(event);
});

$("#carousel-widgets").on( "swiperight", function(event) {
    widgetsCarousel.moveRight(event);
    changeSelectedWidget(event);
});

$widgetsLinks.click(function(event) {
    changeSelectedSite(event);
    widgetsCarousel.changeItem($(event.target).data("num"), "blur-out", "blur-in");
    if (widgetsCarousel !== currentCarousel) {
        sitesCarousel.blurCurrentItem("blur-out");
        setTimeout(function() {
            $sitesContainer.addClass("hidden-medium");
            $widgetsContainer.removeClass("hidden-medium");
        }, timing);
        currentCarousel = widgetsCarousel;
    }
});




