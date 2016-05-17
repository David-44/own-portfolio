/***************************************************************************
 * CALCULATOR
 ***************************************************************************/

 (function(){

  /* DOM ELEMENTS
  *********************************************/

  var output = document.getElementById("cal-output"),       // Display number
        sign = document.getElementById("cal-sign"),         // Display sign
  numberKeys = document.getElementById("cal-number-keys"),  // the number and dot keys container
      dotKey = document.getElementById("cal-dot-key"),      // dot key
       clear = document.getElementById("cal-clear"),        // clear key
       equal = document.getElementById("cal-equal"),        // "=" key
     operand = document.getElementById("cal-operand-keys"); // the container for "-", "+", "*", "/"
  
  
  
  /* VARIABLES
  *********************************************/
  
  var currentNumber = 0,     // What is currently being typed
            numbers = [],    // The array of previous numbers
              signs = [],    // The array of previous signs, including the last one
          dotToggle = false, // Changes to true if decimals are being typed (if the dot key has been pressed)
           dotValue = 0,     // the number of figures after the dot
              total = 0;     // What is returned when pressing equal

  
  
  /* EVENT LISTENERS
  *********************************************/
  
  /* Click event on the numbers and dot symbol 
    This uses event delegation on all numbers and the dot key
      Does nothing if the target is not a button
      If the dot key is pressed, toggles dotToggle
      If a number is being pressed
        If it's not a decimal, multiply the previous number by 10 and add the one being pressed
        If it's a decimal : 
        - increment dotValue
        - multiply the number being typed by 0.1^dotValue and adds it to currentNumber
    Prints currentNumber to screen, limits the number of decimals to dotValue
  */
  
  numberKeys.addEventListener("click", function(event) {
    event.stopPropagation();
    if (event.target.nodeName.toLowerCase() === "button") {
      if (event.target === dotKey) {
        dotToggle = true;
      } else if ((currentNumber.toFixed(dotValue)).length <= 11){
        if (dotToggle === false) {
          currentNumber = currentNumber * 10 + parseInt(event.target.innerHTML);
        } else {
          dotValue++;
          currentNumber += parseFloat(event.target.innerHTML) * Math.pow(0.1, dotValue);
        }
      }
      output.innerHTML = currentNumber.toFixed(dotValue);
    }
  });
  
  
  
  /* Click event on "+" ; "-" ; "*" ; "/" 
    If currentNumber or total holds a value, it pushes its value 
      to the numbers array and resets the variable to 0
    If everything is 0, then two things can happen :
    - It is the state just after initialisation, in which case we do nothing
    - Some operands are already in memory, in which case we change the last one to the one being clicked
    Ends with resetting the dotValue and dotToggle and displaying the sign
  */
  
  operand.addEventListener("click", function(event) {
    event.stopPropagation();
    if (event.target.nodeName.toLowerCase() === "button") {
      if (currentNumber !== 0) {
        numbers.push(currentNumber);
        signs.push(event.target.innerHTML);
        currentNumber = 0;
      } else if ( total !== 0 ) {
        numbers.push(total);
        total = 0;
        signs.push(event.target.innerHTML);
      } else if (signs.length > 0) {
        signs[signs.length - 1] = event.target.innerHTML;
      } 
    }
    dotToggle = false;
    dotValue = 0;
    sign.innerHTML = signs[signs.length - 1] || "";
  });
  
  
    
  /* Click event on equal 
    Folds numbers and signs arrays and applies each operand to the 
      matching numbers in the arrays.
    Stores the number in "total" and displays a maximum of 11 digits
    If the absolute value of "total" is bigger or equal than "10^11", it displays an error
    Resets every variable except for total
  */
  
  equal.addEventListener("click", function(event) {
    numbers.push(currentNumber);
    total = numbers[0];
    if (numbers.length > 1) {
      for (var i = 0; i < numbers.length - 1; i++) {
        switch (signs[i]) {
          case "+":
            total += numbers[i+1];
            break;
          case "-":
            total -= numbers[i+1];
            break;
          case "*":
            total *= numbers[i+1];
            break;
          case "/":
            total /= numbers[i+1];
        } 
      }
    }

     currentNumber = 0;
           numbers = [];
             signs = [];
         dotToggle = false;
          dotValue = 0;
    
    if (Math.abs(total) >= 100000000000) {
      output.innerHTML = "TOO BIG";
      total = 0;
      sign.innerHTML = "";
      return ;
    }
    
    if (("" + total).length > 11) {
      total = parseFloat(("" + total).substr(0, 10));
    }
    
    output.innerHTML = total;
      sign.innerHTML = "";
  });
  
  
  
  /* Click event on clear : resets every value */
  
  clear.addEventListener("click", function(){
    currentNumber = 0;
          numbers = [];
            signs = [];
        dotToggle = false;
         dotValue = 0;
            total = 0;
    
    output.innerHTML = "0";
      sign.innerHTML = "";
  });
  
})();