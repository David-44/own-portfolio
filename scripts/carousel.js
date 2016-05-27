/***************************************************************************
 * CAROUSEL CONSTRUCTOR
 ***************************************************************************/

/* Takes a jQuery collection of objects as argument */

var Carousel = function($collection, timing) {
    this.$collection       = $collection; // The jQuery collection of items
    this.timing            = timing;     // timing of blur functions
    this.currentItemNumber = 0;          // Current item
};

// Blurs the current item using a blur CSS animation
Carousel.prototype.blurCurrentItem = function(blurClass) {
    var that = this;
    this.$collection.eq(this.currentItemNumber).addClass(blurClass);
    setTimeout(function() {
        that.$collection.eq(that.currentItemNumber).removeClass("displayed " + blurClass);
        that.$collection.eq(that.currentItemNumber).addClass("hidden");
    }, this.timing);
};

// Shows the new item using a show CSS animation
Carousel.prototype.showItem = function(itemNumber, showClass) {
    var that = this;
    this.currentItemNumber = itemNumber;
    this.$collection.eq(this.currentItemNumber).addClass(showClass);
    this.$collection.eq(this.currentItemNumber).removeClass("hidden");

    setTimeout(function() {
        that.$collection.eq(that.currentItemNumber).removeClass(showClass);
        that.$collection.eq(that.currentItemNumber).addClass("displayed");
    }, this.timing);
};

// Blurs the current item and shows the new one
Carousel.prototype.changeItem = function(newItem, blurClass, showClass) {
    var that = this;
    this.blurCurrentItem(blurClass);
    setTimeout(function() {
        that.showItem(newItem, showClass);
    }, this.timing);
};

// Changes to the previous item in the collection
Carousel.prototype.moveLeft = function(event) {
    if (this.currentItemNumber === 0) {
        this.changeItem(this.$collection.length - 1, "fade-left", "appear-left");
    } else {
        this.changeItem(this.currentItemNumber - 1, "fade-left", "appear-left");
    }
};

// Changes to the next item in the collection
Carousel.prototype.moveRight = function(event) {
    if (this.currentItemNumber === this.$collection.length - 1) {
        this.changeItem(0, "fade-right", "appear-right");
    } else {
        this.changeItem(this.currentItemNumber + 1, "fade-right", "appear-right");
    }
};






