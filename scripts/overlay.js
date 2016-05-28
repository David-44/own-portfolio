/***************************************************************************
 * OVERLAY REMOVER
 ***************************************************************************/

 // Note : This function makes use of the variable wintop, defined in the indicator.js file

function removeOverlay(trigger, $overlay1, $overlay2) {
	if (wintop >= trigger) {
    	$overlay1.addClass("fade-out-slow");
    	if ($overlay2) {
    	    $overlay2.remove();
        }
    	setTimeout(function(){
            $overlay1.remove();
    	}, 1000);
    }
}

function makeThingsAppear() {
	if ($(window).width() >= 800) {
	    removeOverlay(22, $("#work-overlay"), $("#widgets-overlay"));
	    removeOverlay(55, $("#perso-overlay"), $("#about-overlay"));
	    removeOverlay(87, $("#contact-overlay"));
    } else {
        removeOverlay(15, $("#work-overlay"));
        removeOverlay(34, $("#widgets-overlay"));
        removeOverlay(53, $("#perso-overlay"));
        removeOverlay(72, $("#about-overlay"));
        removeOverlay(89, $("#contact-overlay"));
    }
    
    if (wintop >= 89) {
    	$(window).off("scroll", makeThingsAppear);
    }
}



$(window).on("scroll", makeThingsAppear);