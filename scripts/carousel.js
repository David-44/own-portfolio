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

