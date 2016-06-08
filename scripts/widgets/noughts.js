/***************************************************************************
 * NOUGHTS & CROSSES
 ***************************************************************************/

 /* Unbeatable game of tic tac toe, based on this algorithm :
     https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
*/

(function() {
  
/* DOM ELEMENTS
**********************************************/
 
  /* Main DOM elements and messages, used only for showing or hiding */
  var rules = document.getElementById("tic-rules"),
       lose = document.getElementById("tic-lose"),
       draw = document.getElementById("tic-draw"),
      table = document.getElementById("tic-table"),
 
    /* Variables used for initialisation : Choice of cross or nought */
   crossBtn = document.getElementById("tic-cross"),
  noughtBtn = document.getElementById("tic-nought"),
      
      
     cell0 = document.getElementById("c-0-0"),
     cell1 = document.getElementById("c-0-1"),
     cell2 = document.getElementById("c-0-2"),
     cell3 = document.getElementById("c-1-0"),
     cell4 = document.getElementById("c-1-1"),
     cell5 = document.getElementById("c-1-2"),
     cell6 = document.getElementById("c-2-0"),
     cell7 = document.getElementById("c-2-1"),
     cell8 = document.getElementById("c-2-2"),
    
      /* All table cells are pushed in an array
         It is much simpler to represent the grid as a single array
         instead of a 3x3 2 dimensional array
      */
      
      grid = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8],
      
  
  
      
  /* GAME VARIABLES
  **********************************************/
   
    player1 = "X",  // Letter used by player1
    player2 = "O",  // Letter used by player2
       turn = true, // true if it's payer1's turn, false otherwise
      
      /* All winning cell combos 
      - 3 lines
      - 3 columns
      - 2 diagonals
      */
       wins = [
               [0, 1, 2],
               [3, 4, 5],
               [6, 7, 8],
               [0, 3, 6],
               [1, 4, 7],
               [2, 5, 8],
               [0, 4, 8],
               [2, 4, 6]
              ],
      
      /* corners and sides positions are used by the AI algorithm */
      corners = [0, 2, 6, 8],
        sides = [1, 3, 5, 7],
      
      /* 
         keeps tracks of the three kinds of values : empty, player1 symbol, player2 symbol
         , initialised in init 
         values are "true" if it is of the kind of item, false otherwise
      */
      emptyCells = [],      
      p1Cells = [],      
      p2Cells = [];
    
  
  
  
  /* INITIALISATION
  ********************************************/
  
  var init = function(choice) {
    if (choice === "O") {
      player1 = "O";
      player2 = "X";
      turn = false;
      aiPlay();
    }
    rules.classList.add("tic-hidden");
    table.classList.remove("tic-hidden");
    table.classList.add("tic-visible");
    for (var i = 0; i < 9; i++) {
      emptyCells[i] = true;
      p1Cells[i] = false;
      p2Cells[i] = false;
    }
  };
  
  crossBtn.addEventListener("click", function() {
    init("X");
  });
  
  noughtBtn.addEventListener("click", function() {
    init("O");
  });
  
  
  
  /* Event that re-initialises the game after it is over by 
     removing table cells content and showing the rules block.
     The event also removes itself when clicked
  */
  var endGameEvent = function(event) {
    for (var i = 0; i < 9; i++) {
      grid[i].innerHTML = "";
      
      emptyCells[i] = true;
         p1Cells[i] = false;
         p2Cells[i] = false;
    }
    
       turn = true;
    player1 = "X";
    player2 = "O";
    
     draw.className = "tic-hidden tic-message";
     lose.className = "tic-hidden tic-message";
    table.classList.remove("tic-visible");
    table.classList.add("tic-hidden");
    rules.className = "tic-visible tic-rules";
    window.removeEventListener("click", endGameEvent);
  };
      
 
  
   /* HELPER FUNCTIONS
  ********************************************/
  
  /* Draw : Return true if all table cells are filled */
  var checkForDraw = function() {
    return emptyCells.indexOf(true) === -1;
  };

  /* Loss : Returns true if all the members of a win combo appear in p2Cell */
  var checkForLoss = function() {
    var loss = false;
    wins.forEach(function(item) {
      if (p2Cells[item[0]] && p2Cells[item[1]] && p2Cells[item[2]]) {
        loss = true;
      }
    });
    return loss;
  };

  /* Win Next Turn : 
     For each item in the win array, the function :
     - Keeps track of 2 variable :
       - One that counts the number of time the matching symbol is found
       - Another one that keeps track of the position of an empty cell
     - If the symbol appears twice and the empty cell once, it is a sign of victory
       and the position is pushed in the result array.
  */
  var checkForWin = function(cell) {
    var result = [],
         count = 0,
      emptyPos = -1;
    wins.forEach(function(item) {
      count = 0;
      emptyPos = -1;
      item.forEach(function(val) {
        if (emptyCells[val]) {
          emptyPos = val;
        } else if (cell[val]) {
          count++;
        }
      });
      if (count === 2 && emptyPos !== -1) {
        result.push(emptyPos);
      }
    });
    return result;
  };
  
  
  /* Fork the opponent
     The most complex piece of logic in the game.
     It replaces each empty cell with a cell of the right type and checks if 
       it opens two win possibilities (checkForWin array has length of 2 or more). 
       If it does, then there is a fork and it returns the index of the cell.
  */
  var checkForFork = function(cell) {
    var forkArray = [];
    for (var i = 0; i < cell.length; i++) {
      if (emptyCells[i]) {
        cell[i] = true;
        emptyCells[i] = false;
        forkArray = checkForWin(cell);
        cell[i] = false;
        emptyCells[i] = true;
        if (forkArray.length >= 2) {
          // Deals with a special case in which the opponent control 2 opposite corners
          // and the player controls only the middle.
          // In this case, the player should play a side in order to prevent the opponent to play a diagonal
          if ( p2Cells[4] && (p1Cells[0] && p1Cells[8] || p1Cells[2] && p1Cells[6])){
              return 3;
          }
          // Returns the fork if we are not in the special case
          else {
            return i;
          }
        }
      }
    }
    return -1;
  };

  

  
  /* Play turn :
     Puts the symbol at the right position then starts the other players turn.
     then checks for draw or loss (not win, you can not win)
     Puts a small timeout on both click events to ensure that
     the click that ended the game is not recycled.
  */
  var playTurn = function(player, position) {
    
    grid[position].innerHTML = player;
    emptyCells[position] = false;
    if (player === player1) {
      p1Cells[position] = true;
    } else {
      p2Cells[position] = true;
    }
    
    // Checks for player loss
    if (checkForLoss()) {
      setTimeout(function() {
        lose.className = "tic-visible tic-message";
        window.addEventListener("click", endGameEvent);
      }, 10);
      return ;
    }
    
    // Check for draw
    if (checkForDraw()) {
      setTimeout(function() {
        draw.className = "tic-visible tic-message";
        window.addEventListener("click", endGameEvent);
      }, 10);
    } else {
      turn = !turn;
      if (!turn){
        aiPlay();
      }
    }
  };

  

  
  /* PLAYING THE GAME
  ********************************************/
  
  /* Click event on players turn */
  table.addEventListener("click", function(event) {
    if (turn === true && event.target.innerHTML === "") {
      playTurn(player1, event.target.dataset.grid);
    }
  });
  
  
  /* AI turn to play. Set inside a timeout to avoid the symbol "jumping" at the player */
  function aiPlay() {
    setTimeout(function() {
      var pos = winningAlgo();
      playTurn(player2, pos);
    }, 500);
  };
  
  
  /* What the AI will run every turn to try and win */
  function winningAlgo() {

    /* 1: Check for instant win */
    if (checkForWin(p2Cells).length > 0) {
      return checkForWin(p2Cells)[0];
    }
    
    /* 2: Check for instant loss */
    if (checkForWin(p1Cells).length > 0) {
      return checkForWin(p1Cells)[0];
    }
    
    /* 3: Check for own forks */
    if (checkForFork(p2Cells) !== -1) {
      return checkForFork(p2Cells);
    }
    
    /* 4: Check for opponents forks */
    if (checkForFork(p1Cells) !== -1) {
      return checkForFork(p1Cells);
    }
    
    /* 5: Checks if the center is free */
    if (emptyCells[4]) {
      return 4;
    }
    
    /* 6: Play a corner opposite to where the player is */
    for (var i = 0; i < corners.length; i++){
      if (p1Cells[corners[i]] && emptyCells[corners[3 - i]]) {
        return corners[3 - i];
      }
    }
    
    /* 7: Play any corner */
    for (i = 0; i < corners.length; i++) {
      if (emptyCells[corners[i]]) {
        return corners[i];
      }
    }
    
    /* 8: Play any side */
    for (i = 0; i < sides.length; i++) {
      if (emptyCells[sides[i]]) {
        return sides[i];
      }
    }
  }
  

 })();