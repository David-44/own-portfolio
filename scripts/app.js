/***************************************************************************
 * HELPERS
 ***************************************************************************/


var helpers = function() {
    
    var exports = {};

    exports.removeAllClass = function(item, className) {
        var iterator = document.createNodeIterator(item, NodeFilter.SHOW_ELEMENT, null, false);
        var next = iterator.nextNode();
        while (next) {
            next.classList.remove(className);
            next = iterator.nextNode();
        }
    };

    return exports;

}();
/***************************************************************************
 * CAROUSEL
 ***************************************************************************/

var carousel = function(collection) {

    'use strict';

    var exports = {};
	exports.currentItemNumber = 0; // Index of the current item in imagesArray


    var itemsArray = collection.children, // Array of carousel items
	   currentItem = itemsArray[0];       // DOM element being displayed

    
   

    /* Exports the change image functions */

    exports.changeItem = function(newItemNumber) {
        currentItem.classList.remove("displayed");
        currentItem.classList.add("hidden");

        exports.currentItemNumber = newItemNumber;
        currentItem = itemsArray[exports.currentItemNumber];

        currentItem.classList.remove("hidden");
        currentItem.classList.add("displayed");
    };

    exports.moveLeft = function(event) {
    	if (exports.currentItemNumber === 0) {
    		exports.changeItem(itemsArray.length - 1);
    	} else {
    		exports.changeItem(--exports.currentItemNumber);
    	}
    };

    exports.moveRight = function(event) {
    	if (exports.currentItemNumber === itemsArray.length - 1) {
    		exports.changeItem(0);
    	} else {
    		exports.changeItem(++exports.currentItemNumber);
    	}
    };

    
    return exports;

};


/***************************************************************************
 * MAIN FILE
 ***************************************************************************/


var sitesCarousel = carousel(document.getElementById("carousel-sites"));
var sitesLinks = document.querySelectorAll("#sites-list a");

/* Events Listeners for sites carousel */
document.getElementById("sites-carousel_left").addEventListener("click", function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveLeft();
	helpers.removeAllClass(document.getElementById("sites-list"), "selected");
    sitesLinks[sitesCarousel.currentItemNumber].classList.add("selected");
});

document.getElementById("sites-carousel_right").addEventListener("click", function(event) {
	event.stopPropagation();
    event.preventDefault();
	sitesCarousel.moveRight();
	helpers.removeAllClass(document.getElementById("sites-list"), "selected");
    sitesLinks[sitesCarousel.currentItemNumber].classList.add("selected");
});

document.getElementById("sites-list").addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    var nextImage = event.target.dataset.siteNum;
    if (nextImage) {
        sitesCarousel.changeItem(nextImage);
        helpers.removeAllClass(this, "selected");
        event.target.classList.add("selected");
    }
});