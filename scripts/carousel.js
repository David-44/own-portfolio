/***************************************************************************
 * CAROUSEL
 ***************************************************************************/

/* Takes a jQuery collection of objects as argument */

var carousel = function($collection) {

    'use strict';

    var exports = {};
	exports.currentItemNumber = 0; // Index of the current item in the jQUery object

    
   

    /* Exports the change image functions */

    exports.changeItem = function(newItemNumber) {
        $collection.eq(exports.currentItemNumber).removeClass("displayed");
        $collection.eq(exports.currentItemNumber).addClass("hidden");

        exports.currentItemNumber = newItemNumber;

        $collection.eq(exports.currentItemNumber).removeClass("hidden");
        $collection.eq(exports.currentItemNumber).addClass("displayed");
    };

    exports.moveLeft = function(event) {
    	if (exports.currentItemNumber === 0) {
    		exports.changeItem($collection.length - 1);
    	} else {
    		exports.changeItem(exports.currentItemNumber - 1);
    	}
    };

    exports.moveRight = function(event) {
    	if (exports.currentItemNumber === $collection.length - 1) {
    		exports.changeItem(0);
    	} else {
    		exports.changeItem(exports.currentItemNumber + 1);
    	}
    };

    
    return exports;

};

