/***************************************************************************
 * CAROUSEL
 ***************************************************************************/

var carousel = function(collection, options) {

    'use strict';

    var    itemsArray = collection.children,	// Array of carousel items
	currentItemNumber = 0,                      // Index of the current item in imagesArray
	      currentItem = itemsArray[0],          // DOM element being displayed
	          exports = {};	        
    
   

    /* Change image functions */

    var changeItem = function(newItemNumber) {
        currentItem.classList.remove("displayed");
        currentItem.classList.add("hidden");

        currentItemNumber = newItemNumber;
        currentItem = itemsArray[currentItemNumber];

        currentItem.classList.remove("hidden");
        currentItem.classList.add("displayed");
    };

    var moveLeft = function(event) {
    	event.preventDefault();
    	if (currentItemNumber === 0) {
    		changeItem(itemsArray.length - 1);
    	} else {
    		changeItem(--currentItemNumber);
    	}
    };

    var moveRight = function(event) {
    	event.preventDefault();
    	if (currentItemNumber === itemsArray.length - 1) {
    		changeItem(0);
    	} else {
    		changeItem(++currentItemNumber);
    	}
    };

    /* Events Listeners from options */
    // document.getElementById("sites-carousel_right").addEventListener("click", moveRight);

    options.forEach(function(item) {
    	var eventToCall = null;
    	switch(item[2]) {
    		case "moveLeft":
    		    eventToCall = moveLeft;
    		    break;
    		case "moveRight":
    		    eventToCall = moveRight;
    		    console.log("move right"); 
    		    break;
    		case "changeItem":
    		eventToCall = function() { changeItem(item[3]); };
    	}

        item[0].addEventListener(item[1], eventToCall);
    });
    
    return exports;

};


var sitesOptions = [[document.getElementById("sites-carousel_left"),  "click", "moveLeft"],
                    [document.getElementById("sites-carousel_right"), "click", "moveRight"]
                   ];

carousel(document.getElementById("carousel-sites"), sitesOptions);