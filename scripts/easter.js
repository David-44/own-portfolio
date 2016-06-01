/***************************************************************************
 * EASTER
 ***************************************************************************/

/* 
 * Displays the easter egg on the contact panel 
 * using basic jQuery transitions
 */

// Each transition lasts 500ms and the image remains for 2s
// Total time 3s, hence the 3000 on the setTimeout

var contactImage = $("#contact-image");

 $("#easter-link").click(function(event) {
	event.preventDefault();

    contactImage.fadeOut(500);
    setTimeout( function() {
        contactImage.removeClass("contact-img");
        contactImage.addClass("contact-easter");
        contactImage.fadeIn(500);
    }, 500);

    setTimeout(function() {
    	contactImage.fadeOut(500);
    	setTimeout(function() {
            contactImage.removeClass("contact-easter");
            contactImage.addClass("contact-img");
            contactImage.fadeIn(500);
    	}, 500);
    }, 3000); 
 
});