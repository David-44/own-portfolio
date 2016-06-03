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

// Checks if browser is IE but not IE11
if (navigator.appVersion.indexOf("MSIE") != -1) {
    $("html").addClass("ie");
}




// Testing for linear gradients
dummy.style.backgroundImage = 'linear-gradient(white, black)';
if (!dummy.style.backgroundImage) {
	$("html").addClass("no-gradients");
}






// Testing for animations
// Borrowed from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

if( elm.style.animationName !== undefined ) { animation = true; }    

if( animation === false ) {
  for( var i = 0; i < domPrefixes.length; i++ ) {
    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
      pfx = domPrefixes[ i ];
      animationstring = pfx + 'Animation';
      keyframeprefix = '-' + pfx.toLowerCase() + '-';
      animation = true;
      break;
    }
  }
}

if (!animation) {
	$("html").addClass("no-animations");
}





