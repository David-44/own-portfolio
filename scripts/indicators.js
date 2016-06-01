/***************************************************************************
 * PAGE POSITION INDICATORS
 ***************************************************************************/

// Slider shows progression on wide viewport and page on small ones
var slider = $("#indicator-slider"),
      page = $("#page-number"),


    // wintop is the vertical scroll percentage of the window compared to the document height
    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);

var pageUpdate = function() {
    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);
    slider.css("height", wintop + "%");
    page.text(Math.floor(wintop * 0.055) + 1); // 0.055 : Magic number that displays the page number accurately
};

// Call the pageUpdate function on scroll, and document ready
$(window).scroll(pageUpdate);
$(window).resize(pageUpdate);
$(document).ready(pageUpdate);