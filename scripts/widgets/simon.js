/***************************************************************************
 * SIMON
 ***************************************************************************/

 (function(){

  /* DOM ELEMENTS
  *************************************************/
  
  var buttons = document.getElementById("sim-buttons"),
  
     greenBtn = document.getElementById("sim-green"),
       redBtn = document.getElementById("sim-red"),
      blueBtn = document.getElementById("sim-blue"),
    yellowBtn = document.getElementById("sim-yellow"),
      
     startBtn = document.getElementById("sim-start"),
    strictBtn = document.getElementById("sim-strict"),
      
    streakOut = document.getElementById("sim-streak"),
  
  
   
  
  /* GAME VARIABLES
  *************************************************/
  
      // Sequence of buttons being played.
       sequence = [],
      
      // Array of buttons, accessed by index
     buttonMap = [greenBtn, redBtn, blueBtn, yellowBtn],
      
      // Array of sounds at the same index that the buttons
      soundMap = [new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
                  new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
                  new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
                  new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")],
      
      
   guessCount = 0,         // Counter used to keep track of the guess number during player turn
       strict = false,     // Strict button toggle
       timing = 500,       // Time of each play during Simon's turn
    timerGame = null,      // Keeps in memory the interval ID of the game. Cleared during initialisation
        wrong = false,     // Sets to true when the player guess is wrong. 
      
  playerFinished = true;   // Sets to false during player turn. Used by the game function to know that it's Simon's turn
      
      
  
      
 
  /* HELPER FUNCTIONS
  *************************************************/
  
  // Initialisation, launched each time the start button is pressed
  function init() {
       sequence = [];
     guessCount = 0;
 playerFinished = true;
         timing = 500;
          wrong = false;
    clearInterval(timerGame);
    displayStreak();
    playGame();
  }
  
  
  
  // Launched each time "strict" is pressed
  function toggleStrict() {
    strict = !strict;
    strictBtn.classList.toggle("active");
  }
  
  
  
  // Properly formats and displays the streak on the output
  function displayStreak() {
    var streak = "" + guessCount;
    if (guessCount < 10) {
      streak = "0" + streak;
    } else if (guessCount === 20) {
      streak = "WIN";
    }
    streakOut.innerHTML = streak;
  }
  
  
  
  /* Click handler on the main buttons. Activated only during players turn */
  
  function playerTurn(event) {
    if (!playerFinished) {
      // Gets the index of the event target
      var target = buttonMap.indexOf(event.target);
      
      // What happens if the guess is right
      if (target === sequence[guessCount]) {
        event.target.classList.add("active");
        setTimeout(function() {
          event.target.classList.remove("active");
        }, 300);
        soundMap[target].play();
        guessCount++;
        if (guessCount === sequence.length) {
          displayStreak();
          // Continues the game if the streak is shorter than 20, else the game is stopped
          if (guessCount < 20) {
            playerFinished = true;
            guessCount = 0;
          }
        }
      } 
      
      // What happens if the guess is wrong
      else {
        
        var miss = 0;   // Local variable getting incremented 3 times (to have a flashing light and sound effect)
        wrong = true;
        var mistake = setInterval(function() {
          // Flashes the light and sound
          if (miss < 3) {
            miss++;
            buttonMap[sequence[guessCount]].classList.add("active");
            soundMap[sequence[guessCount]].play();
            setTimeout(function() {
              buttonMap[sequence[guessCount]].classList.remove("active");
            }, 300);
          } else {
            // If strict is on, the game restarts from scratch, else the sequence is replayed.
            clearInterval(mistake);
            if (strict) {
              init();
            } else {
              playerFinished = true;
            }
          }
        }, 600);
        
        
      }
      
    }
  }
  
  
  // Plays an action during Simon's turn
  function playValue(index) {
    buttonMap[index].classList.add("active");
    soundMap[index].play();
    setTimeout(function() {
      buttonMap[index].classList.remove("active");
    }, timing);
  }
  
  
  
  
  /* EVENT HANDLERS
  *************************************************/
  
  startBtn.addEventListener("click", init);
  strictBtn.addEventListener("click", toggleStrict);
  buttons.addEventListener("mousedown", playerTurn);
  
  
  
  
  /* PLAYING THE GAME
  *************************************************/
  
  // Launches the game each time the player's turn is over
  function playGame() {
    timerGame = setInterval(function() {
      if (playerFinished) {
        playerFinished = false;
        simonTurn();
      }
    }, 100);  
  }
  
  /* Plays the sequence during Simon's turn */
  
  function simonTurn() {
    
    // Adds a new number to the sequence, except if the player was wrong.
    // In which case it just repeats the previous sequence.
    if (!wrong) {
      sequence.push(Math.floor(Math.random() * 4));
      if (sequence.length === 7) {
        timing = 400;
      } else if (sequence.length === 13) {
        timing = 300;
      }
    }
    wrong = false;
    
    // Keeps track of what action to play with the index variable
    // Plays each action in the sequence during a time equals to twice the timing
    // When it's finished, it sets the players turn and clears the interval.
    var index = 0;
    var timerSimon = setInterval(function() {
      if (index === sequence.length) {
        clearInterval(timerSimon);
        playerFinished = false;
        return true;
      } else {
        setTimeout(function() {
          playValue(sequence[index]);
          index++;
        }, timing);
      }
    }, timing * 2);
  }
  
})();