/***************************************************************************
 * MAIN FILE
 ***************************************************************************/





/* CAROUSEL ELEMENTS
************************************************************************/

var $sitesContainer = $("#sites-container"),
      sitesCarousel = carousel($("#carousel-sites .carousel-item")),
        $sitesLinks = $("#sites-list .js-work-link"),

  $widgetsContainer = $("#widgets-container"),
    widgetsCarousel = carousel($("#carousel-widgets .carousel-item")),
      $widgetsLinks = $("#widgets-list .js-work-link");





/* ABSTRACTING LINKS AND CAROUSELS
************************************************************************/

var changeSelectedLink = function(collection, $container, $links, event) {
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

var changeSelectedSite = function(event) {
    changeSelectedLink(sitesCarousel, $widgetsContainer, $sitesLinks, event);
};

var changeSelectedWidget = function(event) {
    changeSelectedLink(widgetsCarousel, $sitesContainer, $widgetsLinks, event);
};




/* SITES CAROUSEL
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
    sitesCarousel.changeItem($(event.target).data("num"));
    changeSelectedSite(event);
});





/* WIDGETS CAROUSEL
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
    widgetsCarousel.changeItem($(event.target).data("num"));
    changeSelectedWidget(event);
});






/***************************************************************************
 * NAVIGATION
 ***************************************************************************/

var slider = $("#nav-slider"),
      page = $("#page-number"),

    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);

var pageUpdate = function() {
    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);
    slider.css("height", wintop + "%");
    page.text(Math.floor(wintop * 0.055) + 1);
};

$(document).ready(pageUpdate);
$(window).scroll(pageUpdate);


















