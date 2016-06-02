/***************************************************************************
 * FEATURE DETECTION
 ***************************************************************************/




// Checks if browser is IE11 
// It's not best practice but there are a few strange bugs that occur only in IE11...

if (!(window.ActiveXObject) && "ActiveXObject" in window) {
	$("html").addClass("ie11");
}
