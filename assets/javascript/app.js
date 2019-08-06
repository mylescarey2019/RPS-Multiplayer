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
    appId: "1:157845538465:web:1323a3fecbac83cb"};

  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // variable to firebase database
  var database = firebase.database();

  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");

  // '.info/connected' is a special location provided by Firebase that is updated every time
  // the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");

  

  // ---------------------------------------------------------
  // Global objects
  // ---------------------------------------------------------


  // ---------------------------------------------------------
  // objects and classes
  // ---------------------------------------------------------

  // game objedc t
  var game = {
    // local variables
    gameState: "not started",
    playerName1: "",
    playerName2: "",
    playerChoice1: "",
    playerChoice2: "",
    playerWins1: 0,
    playerWins2: 0,
    playerLosses1: 0,
    playerLosses2: 0,
    playerTies: 0,

  
    // methods
    
  }

  
  // ----------------------------------------------------------------------------
  //  START OF PROGRAM FLOW
  // ----------------------------------------------------------------------------

   
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
 
  

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
    console.log("in global.insturction-btn click event")
   // show insructions
    $('#my-modal').modal('show');
  });

  
  // choice click
  $(".list-group-item-dark").on("click", function(e) {
    console.log("in list-group-item-dark.on.click");
    var value = e.target.value;
    console.log("click button value: ", value);
  });
 

// closes the document.ready
}) 
