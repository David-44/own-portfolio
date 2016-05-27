/***************************************************************************
 * OPERATING THE CAROUSEL AND LINKS ON THE WORK PANEL
 **************************************************************************/





/* OPERATION VARIABLES
************************************************************************/

var timing = 500;






/* CAROUSEL ELEMENTS
************************************************************************/

    $sitesContainer = $("#sites-container"), // Used only to add or remove hidden-medium class
      sitesCarousel = new Carousel($("#carousel-sites .js-carousel-item"), timing),
        $sitesLinks = $("#sites-list .js-work-link"),

  $widgetsContainer = $("#widgets-container"), // Used only to add or remove hidden-medium class
    widgetsCarousel = new Carousel($("#carousel-widgets .js-carousel-item"), timing),
      $widgetsLinks = $("#widgets-list .js-work-link");





/* ABSTRACTING LINKS AND CAROUSELS
************************************************************************/

/* 
 * Helper function that toggles hidden-medium, following a timing
 * It first checks if hidden-medium is not already there
 * $item1 : item to hide
 * $item2 : item to show
 * tTiming : how long the bluring is going to take
 */
var toggleMedium = function($item1, $item2, tTiming) {
    if(!$item1.hasClass("hidden-medium")){
        $item1.addClass("blur-out");
        setTimeout(function() {
            $item1.addClass("hidden-medium");
            $item1.removeClass("blur-out");
            $item2.removeClass("hidden-medium");
        }, tTiming);
    }
};




/*
 * Function that adds is-selected to a new link and removes it to every other link
 */
var changeSelectedLink = function(event, $newLink) {
    event.stopPropagation();
    event.preventDefault();

    $widgetsLinks.removeClass("is-selected");
    $sitesLinks.removeClass("is-selected");
    $newLink.addClass("is-selected");
};


/*
 * Function used on smaller viewports when navigating with the arrows
 * They change the selected link and hidden medium in case the viewport
 * is enlarged and the links are displayed.
 * The inc value is -1 for going left and 1 for going right
 */
var changeSelectedSite = function(event, inc) {
    toggleMedium($widgetsContainer, $sitesContainer, 0);

    var newValue = sitesCarousel.currentItemNumber + inc;
    if (newValue === -1) {
        newValue = $sitesLinks.length - 1;
    } else if (newValue === $sitesLinks.length) {
        newValue = 0;
    }

    changeSelectedLink(event, $sitesLinks.eq(newValue));
};

var changeSelectedWidget = function(event, inc) {
    toggleMedium($sitesContainer, $widgetsContainer, 0);

    var newValue = widgetsCarousel.currentItemNumber + inc;
    if (newValue === -1) {
        newValue = $widgetsLinks.length - 1;
    } else if (newValue === $widgetsLinks.length) {
        newValue = 0;
    }

    changeSelectedLink(event, $widgetsLinks.eq(newValue));
};




/* SITES CAROUSEL EVENT LISTENERS
************************************************************************/

/* 
 * Events used when moving the carousel using the arrows (small viewports)
 * or gestures (all viewports)
 */

$("#sites-carousel_left").click(function(event) {
    sitesCarousel.moveLeft(event);
    changeSelectedSite(event, -1);
});

$("#carousel-sites").on("swipeleft", function(event) {
    sitesCarousel.moveLeft(event);
    changeSelectedSite(event, -1);
});

$("#sites-carousel_right").click(function(event) {
    sitesCarousel.moveRight(event);
    changeSelectedSite(event, 1);
});

$("#carousel-sites").on("swiperight", function(event) {
    sitesCarousel.moveRight(event);
    changeSelectedSite(event, 1);
});

/* Event for click on a link, only on large viewports */
$sitesLinks.click(function(event) {
    changeSelectedLink(event, $(event.target));
    sitesCarousel.changeItem($(event.target).data("num"), "fade-down", "appear-up");
    toggleMedium($widgetsContainer, $sitesContainer, timing);
});





/* WIDGETS CAROUSEL EVENT LISTENERS
************************************************************************/

/* 
 * Events used when moving the carousel using the arrows (small viewports)
 * or gestures (all viewports)
 */

$("#widgets-carousel_left").click(function(event) {
    widgetsCarousel.moveLeft(event);
    changeSelectedWidget(event, -1);
});

$("#carousel-widgets").on("swipeleft", function(event) {
    widgetsCarousel.moveLeft(event);
    changeSelectedWidget(event, -1);
});

$("#widgets-carousel_right").click(function(event) {
    widgetsCarousel.moveRight(event);
    changeSelectedWidget(event, 1);
});

$("#carousel-widgets").on("swiperight", function(event) {
    widgetsCarousel.moveRight(event);
    changeSelectedWidget(event, 1);
});

/* Event for click on a link, only on large viewports */
$widgetsLinks.click(function(event) {
    changeSelectedLink(event, $(event.target));
    widgetsCarousel.changeItem($(event.target).data("num"), "fade-down", "appear-up");
    toggleMedium($sitesContainer, $widgetsContainer, timing);
});




