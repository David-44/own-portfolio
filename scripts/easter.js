/***************************************************************************
 * EASTER
 ***************************************************************************/

var contactImage = $("#contact-image");

 $("#goose-link").click(function(event) {
	event.preventDefault();

    contactImage.fadeOut(500);
    setTimeout( function() {
        contactImage.removeClass("contact-img");
        contactImage.addClass("contact-goose");
        contactImage.fadeIn(500);
    }, 500);

    setTimeout(function() {
    	contactImage.fadeOut(500);
    	setTimeout(function() {
            contactImage.removeClass("contact-goose");
            contactImage.addClass("contact-img");
            contactImage.fadeIn(500);
    	}, 500);
    }, 3000);
 
});