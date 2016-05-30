/***************************************************************************
 * EASTER
 ***************************************************************************/

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