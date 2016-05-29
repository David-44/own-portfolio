/***************************************************************************
 * MAIN FILE
 ***************************************************************************/

$(document).ready(pageUpdate);

$("#about-link").click(function(event) {
    event.preventDefault();
    var ref = $(this).attr("href");
    var background = $("<div>").css({
    	"width": "100%",
    	"height": "100%",
    	"position": "fixed",
    	"top": "0",
    	"left": "0",
    	"z-index": "999",
    	"background-color": "rgba(0, 0, 0, 0.8)"
    });
    var certif = $("<img>").attr("src", ref).addClass("certificate").fadeIn(500);
    $("body").append(background).append(certif);

    background.click(function(event) {
        event.preventDefault();
        certif.fadeOut(500);
        background.fadeOut();
    });
});



