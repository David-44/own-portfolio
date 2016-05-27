/***************************************************************************
 * MAIN FILE
 ***************************************************************************/

$(document).ready(pageUpdate);

function makeThingsAppear() {
    if (wintop >= 20) {
    	$("#work-overlay").addClass("fade-out-slow");
    	setTimeout(function(){
            $("#work-overlay").remove();
    	}, 1000);
    	
    }
}



$(window).on("scroll", makeThingsAppear)



