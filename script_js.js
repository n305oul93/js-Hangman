// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================
console.log("Connected")
// Array of Word Options (all lowercase)
var wordsList = ["jerome", "neena", "darion", "lou", "greg", "jordan",
  "jasmine", "stephen", "jacob", "adam", "rui", "luis"];
// Solution will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// =========================================================================================

// startGame()
// Its how we we will start and restart the game.
// (Note: It's not being run here. It's just being made for future use.)
function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution is chosen randomly from wordList.
  chosenWord = wordsList[parseInt(Math.random() * wordsList.length)]

  // The word is broken into individual letters.
  lettersInChosenWord = chosenWord.split("");

  // We count the number of letters in the word.

  // We print the solution in console (for testing).


  // CRITICAL LINE - Here we *reset* the guess and success array at each round.
  blanksAndSuccesses = [];

  // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
  wrongGuesses = [];

  // Fill up the blanksAndSuccesses list with appropriate number of blanks.
  // This is based on number of letters in solution.
  for(var i = 0; i < lettersInChosenWord.length; i++){
    blanksAndSuccesses.push("_");
  }

  // Print the initial blanks in console.

  // Reprints the guessesLeft to 9
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses;

  document.getElementById("hang-man").src = "empty-man.jpg";
}

// checkLetters() function
// It's where we will do all of the comparisons for matches.
// Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {
console.log("The letter passed in is: " + letter);
  // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
  var exists = false;

  // Check if a letter exists inside the array at all.
      // If the letter exists then toggle this boolean to true. This will be used in the next step.
      lettersInChosenWord.map(function(letterInArray,index){
        if(letter === letterInArray){
          blanksAndSuccesses[index] = letter;
          exists = true;
        }
      })

      if(exists){
        console.log("It Exists");
        numGuesses--;
        document.getElementById("guesses-left").innerHTML = numGuesses;
        document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
      }else{
        console.log("It Doesn't Exist");
        numGuesses--;
        wrongGuesses.push(letter);
        document.getElementById("guesses-left").innerHTML = numGuesses;
        document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
        updateHangman();
      }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).

    // Loop through the word

      // Populate the blanksAndSuccesses with every instance of the letter.

        // Here we set the specific space in blanks and letter equal to the letter when there is a match.


    // Logging for testing.

  // If the letter doesn't exist at all...
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.


// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
  console.log("Wins: " + winCounter + " Losses: " + lossCounter + " Guesses Left: " + numGuesses);

  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.

  // This will print the array of guesses and blanks onto the page.

  // This will print the wrong guesses onto the page.


  // If we have gotten all the letters to match the solution...
   if(blanksAndSuccesses.join("") === chosenWord) {
       // ..add to the win counter & give the user an alert.
       winCounter += 1;
       setTimeout(function(){alert("Congratulations, you win!");}, 1000);

       // Update the win counter in the HTML & restart the game.
       document.getElementById("win-counter").innerHTML = winCounter;
       setTimeout(function(){startGame()}, 1000);
   }

  // If we've run out of guesses..
     if(numGuesses == 0 && blanksAndSuccesses.join("") !== chosenWord) {
         // Add to the loss counter.
         lossCounter += 1;
         // Give the user an alert.
         setTimeout(function(){alert("Sorry Game Over!");}, 1000);

         // Update the loss counter in the HTML.
         document.getElementById("loss-counter").innerHTML = lossCounter;
         // Restart the game.
         setTimeout(function(){startGame()}, 1000);
     }

}

function updateHangman() {
  switch(numGuesses) {
      case 8:
          document.getElementById("hang-man").src = "hang-head.png";
          break;
      case 7:
          document.getElementById("hang-man").src = "hang-body.png";
          break;
      case 6:
          document.getElementById("hang-man").src = "right-arm.png";
          break;
      case 5:
          document.getElementById("hang-man").src = "left-arm.png";
          break;
      case 4:
          document.getElementById("hang-man").src = "right-hand.png";
          break;
      case 3:
          document.getElementById("hang-man").src = "left-hand.png";
          break;
      case 2:
          document.getElementById("hang-man").src = "right-leg.png";
          break;
      case 1:
          document.getElementById("hang-man").src = "left-leg.png";
          break;
      case 0:
          document.getElementById("hang-man").src = "full-hangman.jpg";
          break;
  }
}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

// Starts the Game by running the startGame() function

startGame();

  // Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Converts all key clicks to lowercase letters.
  var letterGuessed = String.fromCharCode(event.which).toLowerCase();
  // Runs the code to check for correctness.
  checkLetters(letterGuessed);
  // Runs the code after each round is done.
  roundComplete();
}
