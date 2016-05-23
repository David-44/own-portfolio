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
   //   navUp = $("#nav-up"),
   // navDown = $("#nav-down"),

    wintop = 0;

$(window).scroll(function(event) {
    wintop = Math.round($(window).scrollTop() / $(document).height() * 100);
    slider.css("top", wintop + "%");
    // if (wintop <= 12) {
    //     navUp.hide();
    // }
    // if (wintop >= 63) {
    //     navDown.hide();
    // }
    // if (wintop > 12 && wintop < 63) {
    //     navUp.show();
    //     navDown.show();
    // }
});

// navUp.click(function() {
//     event.preventDefault();
//     if (wintop <= 25) {
//         $(window).scrollTop(0);
//     } else if (wintop <= 50) {
//         $(window).scrollTop($(document).height() * 0.25);
//     } else {
//         $(window).scrollTop($(document).height() * 0.5);
//     }
// });

// navDown.click(function() {
//     event.preventDefault();
//     if (wintop >= 50) {
//         $(window).scrollTop($(document).height() * 0.75);
//     } else if (wintop >= 25) {
//         $(window).scrollTop($(document).height() * 0.5);
//     } else {
//         $(window).scrollTop($(document).height() * 0.25);
//     }
// });

















