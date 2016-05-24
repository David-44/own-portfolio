/***************************************************************************
 * PAGE POSITION INDICATORS
 ***************************************************************************/

var slider = $("#indicator-slider"),
      page = $("#page-number"),

    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);

var pageUpdate = function() {
    wintop = Math.round($(window).scrollTop() / ($(document).height() - ($(window).height())) * 100);
    slider.css("height", wintop + "%");
    page.text(Math.floor(wintop * 0.055) + 1);
};

$(window).scroll(pageUpdate);
$(window).resize(pageUpdate);
