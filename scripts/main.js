/***************************************************************************
 * MAIN FILE
 ***************************************************************************/

$(document).ready(pageUpdate);

function makeThingsAppear() {
    if (wintop >= 20) {
    	$("#work-overlay").addClass("fade-out-slow");
    }
}



$(window).on("scroll", makeThingsAppear)



