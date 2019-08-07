
    // Creates an array that lists out all of the options (Rock, Paper,Scissors, spocK,
    // Lizard).
    var validTurnChoices = ["r", "p", "s","k","l"];
    

    // object for game turn 
    var gameTurn = {
      userMove: "",
      computerMove: "",
      currentTurnResult: "",

      // method for game turn result
      evalateTurn: function() {
        if ((this.userMove === "r" && this.computerMove === "s") ||
            (this.userMove === "p" && this.computerMove === "r") ||
            (this.userMove === "s" && this.computerMove === "p") ||
            (this.userMove === "k" && this.computerMove ==  "r") ||
            (this.userMove === "k" && this.computerMove ==  "s") ||
            (this.userMove === "l" && this.computerMove ==  "k") ||
            (this.userMove === "l" && this.computerMove ==  "p"))
        {
          this.currentTurnResult = "win";
        }
        else if (this.userMove === this.computerMove) {
          this.currentTurnResult = "tie";
        }
        else {
          this.currentTurnResult = "loss";
        }
      }
    };
    

    // object for UI
    var userInterface =  {
      playerName: null,
      playerChoice: null,
      computerChoice: null,
      currentTurnResult: null,
      wins: null,
      losses: null,
      ties: null,
      rock: "Rock",
      paper: "Paper",
      scissors: "Scissors",
      spock: "Spock",
      lizard: "Lizard",
      playerUiWord: "",
      computerUiWord: "",

     initUI: function(playerName) {
 
    // get screen element ids
      playerName = document.getElementById("player-name");    
      playerChoice = document.getElementById("user-choice");
      computerChoice = document.getElementById("computer-choice");
      currentTurnResult = document.getElementById("turn-result")
      wins = document.getElementById("wins");
      losses = document.getElementById("losses");
      ties = document.getElementById("ties");

      // initialize screen elements
      playerName.textContent = "Hello " + game.playerName + " let's play Rock Paper Scissors spocK, Lizard";
      playerChoice.textContent = game.playerName + "'s choice: ";
      computerChoice.textContent = "Computer choice: ";
      currentTurnResult.textContent = "Current Turn Result: " + gameTurn.currentTurnResult;
      wins.textContent = game.playerName + "'s Wins: " + game.wins;
      losses.textContent = game.playerName + "'s Losses: " + game.losses;
      ties.textContent = game.playerName + "'s Ties: " + game.ties;
     },

    // update the letters picked elements
    updateUiChoice: function(playerName, playerLetter, computerLetter) {
      switch (playerLetter) {
        case 'r': {
          playerUiWord = this.rock;
          break;
        }
        case 'p': {
          playerUiWord = this.paper;
          break;
        } 
        case 's': {
          playerUiWord = this.scissors;
          break;
        }     
        case 'k': {
          playerUiWord = this.spock;
          break;
        } 
        case 'l': {
          playerUiWord = this.lizard;
          break;
        }             
      };
      switch (computerLetter) {
        case 'r': {
          computerUiWord = this.rock;
          break;
        }
        case 'p': {
          computerUiWord = this.paper;
          break;
        } 
        case 's': {
          computerUiWord = this.scissors;
          break;
        }  
        case 'k': {
          computerUiWord = this.spock;
          break;
        } 
        case 'l': {
          computerUiWord = this.lizard;
          break;
        }                  
      };
      playerChoice.textContent = playerName + "'s choice: " + playerUiWord;
      computerChoice.textContent = "Computer choice: " + computerUiWord;
     },

    // update results element
    updateUiResults: function() {
      currentTurnResult.textContent = "Current Turn Result: " + gameTurn.currentTurnResult;
    },

    // update stats elements
    updateUiStats: function() {
      wins.textContent = game.playerName + "'s Wins: " + game.wins;
      losses.textContent = game.playerName + "'s Losses: " + game.losses;
      ties.textContent = game.playerName + "'s Ties: " + game.ties;
    },

    // update message element
    updateUiMessage: function(playerLetter) {
      playerChoice.textContent = game.playerName + "'s please use R, P, S, K or L instead of " + playerLetter;
    }
    };

    //  *** Start of game flow *** 
    game.startGame();
    userInterface.initUI(game.playerName);

     // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

      // Determines which key was pressed.
      var userGuess = event.key;

      // if user selected r, p, s, k, l then proceed with turn
      if (validTurnChoices.indexOf(userGuess) >= 0) {


        // Randomly chooses a choice from the options array. This is the Computer's guess.
        var computerGuess = validTurnChoices[Math.floor(Math.random() * validTurnChoices.length)];
        // update screen choice elements
        userInterface.updateUiChoice(game.playerName,userGuess,computerGuess);

        // play game turn, player choice, computer choice, show what was choosen
        gameTurn.userMove = userGuess;
        gameTurn.computerMove = computerGuess;
        gameTurn.evalateTurn();
        userInterface.updateUiResults();

        // evaluate the turn result
        switch (gameTurn.currentTurnResult) {
          case "win": {
            game.wins++;
            break;
          }
          case "loss": {
            game.losses++;
            break;
          }
          case "tie": {
            game.ties++;
            break;
          }
        };
      }
      else {
        userInterface.updateUiMessage(userGuess);
      };

      // show the new stats on the UI
      userInterface.updateUiStats();
  };
