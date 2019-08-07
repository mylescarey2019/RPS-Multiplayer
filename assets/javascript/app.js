// --------------------------------------------------------
// Rock Paper Scissors Lizard Spock - MultiPlayer
// ---------------------------------------------------------
// Summary:
// Two player game of Rock Paper Scissors Lizard Spock
// Uses two browser window allowing players to be remote.
// Firebase cloud database leveraged for data storage/exchange
// between the two brower instances
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  
// 
// Web-Page:  
// 
// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------
// goals of this project were:
// 1.  TBD
// 
// 4.  TBD



// ---------------------------------------------------------
// Enhancements:
// ---------------------------------------------------------
// 1. revisit to TBD

// ---------------------------------------------------------
// User Stories / Use Cases
// ---------------------------------------------------------

// 0.  This was the intended Use Case and program flow - final result was close to this
//     although some differences to evolve during development.  See javascript code header
//     for more details.

// 1.  TBD
//     1. TBD

    
// 2.  TBD
//     1. TBD



// ### Psuedo Code - notes

// 1. Global
//     1. Variables
//     2. Functions

// 2. Objects/Classes
//     1. TBD
//         1. Properties
//             1. TBD
//         2. Methods
//             1. TBD

// 3. Events/Listeners/Timers
//     1. TBD


// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------
// initial some variables to be used in questionPool
// maybe this goes in a game object but not sure
$(document).ready(function(){

  // ---------------------------------------------------------
  // Global Variables
  // ---------------------------------------------------------
  // firebase config definition
  var firebaseConfig = {  
    apiKey: "AIzaSyD6to2Bb1RFSl4vdAnEP5ifb70xrLDZrDU",
    authDomain: "rockpaperscissorlizardsp-393e9.firebaseapp.com",
    databaseURL: "https://rockpaperscissorlizardsp-393e9.firebaseio.com",
    projectId: "rockpaperscissorlizardsp-393e9",
    storageBucket: "",
    messagingSenderId: "157845538465",
    appId: "1:157845538465:web:1323a3fecbac83cb"}

  // // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // // variable to firebase database
  var database = firebase.database();

  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");

  var intermissionTimeConstant = 5;
  var intermissionTime = intermissionTimeConstant;

  

  // ---------------------------------------------------------
  // Global functions
  // ---------------------------------------------------------

  // start the intermission countdown timer
  function startIntermissionCountdown() {
    console.log("in global.startIntermissionCountdown");
      intermissionTime = intermissionTimeConstant;
      intermissionIntervalId = setInterval(intermissionIntervalCountdown, 1000);
  }
  
  // stop the intermission countdown timer
  function stopIntermissionCountdown() {
    console.log("in global.stopIntermissionCountdown");
    clearInterval(intermissionIntervalId);
    game.resetTurn()
  }

  // decrement the question countdown timer
  function intermissionIntervalCountdown() {
    console.log("intermission timer decrement: " + intermissionTime);
    // decrement time by 1
    intermissionTime--;
    //  time expired
    if (intermissionTime === 0) {
      stopIntermissionCountdown() 
    }
  } 
  


  // ---------------------------------------------------------
  // objects and classes
  // ---------------------------------------------------------

  // game object
  var game = {
    // local variables
    gameState: "not started",
    youArePlayer: 0,
    playerName1: "Waiting for Player",
    playerName2: "Waiting for Player",
    playerChoice1: "",
    playerChoice2: "",
    playerWins1: 0,
    playerWins2: 0,
    playerLosses1: 0,
    playerLosses2: 0,
    playerTies: 0,
    currentTurnResult: "",
    currentTurnResultDesc: "",

  
    // methods

    // determine results
    resultEngine: function() {
      console.log("in game.resultEngine");
      // local
      var result = '';
      var resultDesc = ''
      // evaluate resuls from player 1 perspective
      console.log("player1: ",this.playerChoice1);
      console.log("player2: ",this.playerChoice2);
      
      
      if (this.playerChoice1 === "rock" && this.playerChoice2 === "scissors") {
        result = "win";
        resultDesc = "crushes";
      }
      else if (this.playerChoice1 === "rock" && this.playerChoice2 === "lizard") {
        result = "win";
        resultDesc = "crushes";
      }
      else if (this.playerChoice1 === "paper" && this.playerChoice2 === "rock") {
        result = "win";
        resultDesc = "covers";
      }
      else if (this.playerChoice1 === "paper" && this.playerChoice2 ==  "spock") {
        result = "win";
        resultDesc = "disproves";
      }
      else if (this.playerChoice1 === "scissors" && this.playerChoice2 ==  "paper") {
        result = "win";
        resultDesc = "cuts";
      }
      else if (this.playerChoice1 === "scissors" && this.playerChoice2 ==  "lizard") {
        result = "win";
        resultDesc = "decapitates";
      }
      else if (this.playerChoice1 === "lizard" && this.playerChoice2 ==  "spock") {
        result = "win";
        resultDesc = "poisons"
      }
      else if (this.playerChoice1 === "lizard" && this.playerChoice2 === "paper") {
        result = "win";
        resultDesc = "eats"
      }
      else if (this.playerChoice1 === "spock" && this.playerChoice2 === "scissors") {
        result = "win";
        resultDesc = "smashes"
      }
      else if (this.playerChoice1 === "spock" && this.playerChoice2 === "rock") {
        result = "win";
        resultDesc = "vaporizes"
      }


      else if (this.playerChoice1 === "rock" && this.playerChoice2 ==  "spock") {
        result = "loss";
        resultDesc = "vaporized by"
      }
      else if (this.playerChoice1 === "rock" && this.playerChoice2 ==  "paper") {
        result = "loss";
        resultDesc = "covered by"
      }



      else if (this.playerChoice1 === "paper" && this.playerChoice2 ==  "scissors") {
        result = "loss";
        resultDesc = "cut by"
      }
      else if (this.playerChoice1 === "paper" && this.playerChoice2 ==  "lizard") {
        result = "loss";
        resultDesc = "eaten by"
      }



      else if (this.playerChoice1 === "scissors" && this.playerChoice2 ==  "rock") {
        result = "loss";
        resultDesc = "crushed by"
      }
      else if (this.playerChoice1 === "scissors" && this.playerChoice2 ==  "spock") {
        result = "loss";
        resultDesc = "smashed by"
      }



      else if (this.playerChoice1 === "lizard" && this.playerChoice2 ==  "scissors") {
        result = "loss";
        resultDesc = "decapited by"
      }
      else if (this.playerChoice1 === "lizard" && this.playerChoice2 ==  "rock") {
        result = "loss";
        resultDesc = "crushed by"
      }



      else if (this.playerChoice1 === "spock" && this.playerChoice2 ==  "paper") {
        result = "loss";
        resultDesc = "disproven by"
      }
      else if (this.playerChoice1 === "spock" && this.playerChoice2 ==  "lizard") {
        result = "loss";
        resultDesc = "poisoned by"
      } 


      else if (this.playerChoice1 === this.playerChoice2) {
        result = "tie";
        resultDesc = "ties"
      };
      this.currentTurnResult = result;
      this.currentTurnResultDesc = resultDesc;
      console.log("Player 1 result is a: ", this.currentTurnResult);
      console.log("Player 1 result desc is: ", this.currentTurnResultDesc);
    },

    // reveal results
    revealEngine: function() {
      console.log("in game.revealEngine");
      this.resultEngine();
    
      userInterface.hideChoices();
      $("#left-container-2").text(this.playerChoice1);
      $("#right-container-2").text(this.playerChoice2);
      switch (this.currentTurnResult) {
        case "win": { 
          console.log("in WIN");
          
          this.playerWins1++;
          this.playerLosses2++;
          $("#left-card-top").addClass("win-state");
          $("#right-card-top").addClass("loss-state");
          $("#left-container-2").addClass("win-state-2");
          $("#right-container-2").addClass("loss-state-2");
        }
          break;
          
        case "tie": {
          console.log("in TIE");
          
          this.playerTies++;
          $("#left-card-top").addClass("tie-state");
          $("#right-card-top").addClass("tie-state");
          $("#left-container-2").addClass("tie-state-2");
          $("#right-container-2").addClass("tie-state-2");
        }
          break;
          
        case "loss": {
          console.log("in LOSS");
          this.playerLosses1++;
          this.playerWins2++;
          $("#left-card-top").addClass("loss-state");
          $("#right-card-top").addClass("win-state");
          $("#left-container-2").addClass("loss-state-2");
          $("#right-container-2").addClass("win-state-2");
        }
          break;

        default:
          break;
      };
      console.log("this current turn result desc: ",this.currentTurnResultDesc);
      
      $("#results").text(this.currentTurnResultDesc);
      console.log("player 1 stat W-L-T " + this.playerWins1 + " " + this.playerLosses1 + " " + this.playerTies);
      console.log("player 2 stat W-L-T " + this.playerWins2 + " " + this.playerLosses2 + " " + this.playerTies);  
      var scorePlayer1 = "Wins: " + this.playerWins1 + "   Losses: " + this.playerLosses1 + "   Ties: " + this.playerTies;
      if (game.youArePlayer === 1) {
        var scorePlayer1 = "Wins: " + this.playerWins1 + "   Losses: " + this.playerLosses1 + "   Ties: " + this.playerTies;
        $("#left-score").text(scorePlayer1);
      }
      else {
        var scorePlayer2 = "Wins: " + this.playerWins2 + "   Losses: " + this.playerLosses2 + "   Ties: " + this.playerTies;
        $("#right-score").text(scorePlayer2);
      }

      startIntermissionCountdown();

    },

    // reset turn 
    resetTurn: function() {
      console.log("in game.resetTurn");
      // clear the player choices
      game.playerChoice1 = "";
      game.playerChoice2 = "";
      $("#results").text("Play Again");
      $("#left-card-top").removeClass("win-state");
      $("#left-card-top").removeClass("loss-state");
      $("#left-card-top").removeClass("tie-state");
      $("#right-card-top").removeClass("win-state");
      $("#right-card-top").removeClass("loss-state");
      $("#right-card-top").removeClass("tie-state");
      $("#left-container-2").removeClass("win-state-2");
      $("#left-container-2").removeClass("loss-state-2");
      $("#left-container-2").removeClass("tie-state-2");
      $("#right-container-2").removeClass("win-state-2");
      $("#right-container-2").removeClass("loss-state-2");
      $("#right-container-2").removeClass("tie-state-2");

      // clear choices from database
      var firebaseChoice1 = database.ref("/choice1");
      firebaseChoice1.remove();
      var firebaseChoice2 = database.ref("/choice2");
      firebaseChoice2.remove();
      if (game.youArePlayer === 1) {
        userInterface.leftChoices();
        $("#right-container-2").text("");
      }
      else {
        userInterface.rightChoices();
        $("#left-container-2").text("");
      }
    }
  }

  // user interface object
  var userInterface = {
    // local variables

    // methods
    // show the left move options
    leftChoices: function() {
      console.log("in userInterface.showChoices");
      $("#left-container").show();
      $("#left-container-2").hide();
      $("#right-container").hide();
      $("#right-container-2").show();
    },

    // hide the right move options
    rightChoices: function() {
      console.log("in userInterface.hideChoices");
      $("#left-container").hide();
      $("#left-container-2").show();
      $("#right-container").show();
      $("#right-container-2").hide();
    },

    // hide the move options
    hideChoices: function() {
      console.log("in userInterface.hideChoices");
      $("#left-container").hide();
      $("#left-container-2").show();
      $("#right-container").hide();
      $("#right-container-2").show();
    }

  }
  
  // ----------------------------------------------------------------------------
  //  START OF PROGRAM FLOW
  // ----------------------------------------------------------------------------

   console.log("Starting the program");
   userInterface.hideChoices();

   
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
 
  // get value from name box
  $("#set-name-btn").on("click", function(event) {
    console.log("in global.set-name-btn click event");
    event.preventDefault();
    var name = $("#name-input").val().trim();
    console.log("right now i am player: ", game.youArePlayer);
 
    if (game.youArePlayer === 0) {
      game.youArePlayer = 1;
      game.playerName1 = name;
      database.ref("/game").set({
        playerName1: game.playerName1,
        playerName2: "Waiting for Player"
      });
      $("#left-player").text(name);
    }
    else {  // you have to be player two by now
      // game.youArePlayer = 2;
      game.playerName2 = name;
      database.ref("/game").set({
        playerName1: game.playerName1,
        playerName2: game.playerName2
      });
      $("#right-player").text(name);

    };

    console.log("right now i am player: ", game.youArePlayer);

    // // player 1 on the left player 2 on the rigth
    // if (game.youArePlayer === 1) {
  
    // }
    // else {
    //   $("#right-player").text(name);
    // };
   

    // hide the name entry 
    $("#name-input").hide();
    $("#set-name-btn").hide();

  });


    
  


  // get firebase snapshot on initial load and when database changes
  database.ref("/game").on("value", function (snap) {
    console.log("in global.database ref /players value event");
    console.log(snap.val());
    
    // if no player yet then you are firebase player 1 else firebase player 2
    if (snap.child("playerName1").exists()) {

      if (game.youArePlayer === 1) { // first to enter a name 
        console.log("this is player 1")
        $("#right-player").text(snap.val().playerName2);
        game.playerName2 = snap.val().playerName2;
        // if (game.playerName2 !== "Waiting for Player") {
        //   userInterface.showChoices();
        // }
      }
      else {  // player 0 becoming player 1
        console.log("this is player 2")
        game.youArePlayer = 2;
        $("#left-player").text(snap.val().playerName1);
      };


      // console.log("if you haven't entered name yet then you will be player 2");
      // // you are player two now, but still have to enter you name
      // if (game.youArePlayer === 0) {
      //   game.youArePlayer = 2;
      // };

      game.playerName1 = snap.val().playerName1;
      console.log(game.playerName1);
      console.log(game.playerName2);
      
      if (game.playerName1 !== "Waiting for Player"
      && game.playerName2 !== "Waiting for Player") {
        if (game.youArePlayer === 1) {
          userInterface.leftChoices();
        }
        else {
          userInterface.rightChoices();
        }
      };
    };

  });



  // When the client's connection state changes...
  connectedRef.on("value", function(snap) {
    console.log("in connectedRef.value-event");
    // If they are connected..
    if (snap.val()) {
      // Add user to the connections list.
      var con = connectionsRef.push(true);
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });



  // When first loaded or when the connections list changes...
  connectionsRef.on("value", function(snapshot) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#msg-box").text(snapshot.numChildren());
  });


  // instruction button event - show modal
  $("#instruction-btn").on("click",function() {
    console.log("in global.instruction-btn click event")
   // show insructions
    $('#my-modal').modal('show');
  });

  // clear button event 
  $("#clear-btn").on("click",function() {
    console.log("in global.clear-btn click event")
   // clear the variables
   var firebaseGame = database.ref("/game");
   firebaseGame.remove();
   var firebaseChoice1 = database.ref("/choice1");
   firebaseChoice1.remove();
   var firebaseChoice2 = database.ref("/choice2");
   firebaseChoice2.remove();
  });


  // get firebase snapshot on initial load and when database changes
  database.ref("/choice1").on("value", function (snap) {
    console.log("in global.database ref /choice 1 value event");
    console.log(snap.val());
    // if exists
    if (snap.child("playerChoice1").exists()) {
      // local logging of the result
      game.playerChoice1 = snap.val().playerChoice1;
      console.log("player 1 choice is: ", game.playerChoice1);
      console.log("Opposite choice is: ", game.playerChoice2);
      if (game.playerChoice2 !== '') {
        console.log("ready to compute results");
        game.revealEngine();
        
      }
    } 
  });

  // get firebase snapshot on initial load and when database changes
  database.ref("/choice2").on("value", function (snap) {
    console.log("in global.database ref /choice 2 value event");
    console.log(snap.val());
    // if exists
    if (snap.child("playerChoice2").exists()) {
      // local logging of the result
      game.playerChoice2 = snap.val().playerChoice2;
      console.log("player 2 choice is: ", game.playerChoice2);
      console.log("Opposite choice is: ", game.playerChoice1);
      if (game.playerChoice1 !== '') {
        console.log("ready to compute results");
        game.revealEngine();
      }
    };
  });
  

  // choice click
  $(".list-group-item-dark").on("click", function(e) {
    console.log("in list-group-item-dark click event");
    var value = e.target.value;
    console.log("click button value: ", value);
  if (game.youArePlayer === 1) {
    game.playerChoice1 = value;
    database.ref("/choice1").set({
      playerChoice1: game.playerChoice1,
    })
  }   
  else {
    game.playerChoice2 = value;
    database.ref("/choice2").set({
    playerChoice2: game.playerChoice2,
    })
  };


  });
 

}) // closes the document.ready
