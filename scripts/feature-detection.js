/***************************************************************************
 * FEATURE DETECTION
 ***************************************************************************/




// Dummy that will be used to check features
var dummy = document.createElement("p");





// Checks if browser is IE11 
// It's not best practice but there are a few strange bugs that occur only in IE11...
if (!(window.ActiveXObject) && "ActiveXObject" in window) {
	$("html").addClass("ie11");
}

// Checks if browser is IE10
if (Function('/*@cc_on return document.documentMode===10@*/')()){
    $("html").addClass("ie10");
}





// Testing for linear gradients
dummy.style.backgroundImage = 'linear-gradient(white, black)';
if (!dummy.style.backgroundImage) {
	$("html").addClass("no-gradients");
}





