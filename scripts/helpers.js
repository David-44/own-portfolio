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