//Audio functions and declarations
new Audio('assets/sounds/themesong.mp3').play();

setInterval (function() {
	new Audio('assets/sounds/themesong.mp3').play();
}, 120000);

setInterval (function() {		
	document.getElementById("blinkyText").style.color = "#ffffff";
	setTimeout(function() {
	document.getElementById("blinkyText").style.color = "#e60000";
	}, 500)
}, 1000);

var soundOfBenderWin = ['assets/sounds/win_1.mp3', 
						'assets/sounds/win_2.mp3', 
						'assets/sounds/win_3.mp3', 
						'assets/sounds/win_4.mp3'];
var soundOfBenderLoss = ['assets/sounds/loss_1.mp3', 
						'assets/sounds/loss_2.mp3', 
						'assets/sounds/loss_3.mp3', 
						'assets/sounds/loss_4.mp3'];
//End of Audio functions and declarations

//Game variables
var hangWord = ["copper", "explain", "decisive", "tenuos", "branch",
				"vagabond", "redundant", "sabotage", "ridiculous", "uninspiring",
				"trouble", "blackjack", "wrench", "therapeutic", "invention",
				"calculate", "structure", "magical", "repulsive", "calendar"];

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var displayWord = "";
var userInput;		
var arrayWord = [];
var displayWord = "";
var gameOver = 10;
var winscore = 0;
var lossscore = 0;

var blinky = document.getElementById("blinkyText");
var returnDisplay = document.getElementById("theWord");
var guessLetters = document.getElementById("guessBox");
var lives = document.getElementById("livesLeft");

//Initial setup of displays
returnDisplay.innerHTML = displayWord;
lives.innerHTML = "Lives: 10";
guessLetters.innerHTML = "Guesses:  "
returnDisplay.innerHTML = "- - - - -";
document.getElementById("winBox").innerHTML = "Wins: 0"
document.getElementById("lossBox").innerHTML = "Loss: 0"		

//Game's main function
mainFunction();
function mainFunction() {
	document.onkeyup = function(event) {

		var entryInput = event.key;

		if (entryInput === "Enter") {

			new Audio('assets/sounds/intro.mp3').play();
			randomNumberForSound = Math.floor(Math.random() * 4) + 0;

			var mainI = 0;
			var inputsList = [];					

			randomNumber = Math.floor(Math.random() * 20) + 0;					
			bufferWord = hangWord[randomNumber];
			wordLength = hangWord[randomNumber].length;	
			guessLetters.innerHTML = "Guesses:  "
			blinky.innerHTML = "Good Luck Chum!"
			
			lives.innerHTML = "Lives: 10"	

			displayWord = "";
			for (var i = 0; i < wordLength; i++) {
				displayWord += (" - ");
				arrayWord[i] = " - ";
			}
			returnDisplay.innerHTML = displayWord;

			console.log(bufferWord);

			document.onkeyup = function(event) {
				var userInput = event.key;

				if (mainI < gameOver) {				
					console.log(userInput);

					var indexMultiple = [];

					//clearInterval(hurryVariable);
					//var hurryVariable = setInterval (function() {
					//	setTimeout(function() {new Audio('assets/sounds/hurry.mp3').play();}, 10000);
					//}, 10000); 
												

					if (inputsList.indexOf(userInput) === -1 && alphabet.indexOf(userInput) !== -1) {
						if (bufferWord.indexOf(userInput) > -1) {
							for (i = 0; i < bufferWord.length; i++) {
								if (bufferWord.charAt(i) === userInput) {
									indexMultiple.push(i);
								}
							}

							for (i = 0; i < indexMultiple.length; i++) {
								indexOfIndex = indexMultiple[i];
								arrayWord[indexOfIndex] = bufferWord.charAt(indexOfIndex);
							}					

							//console.log(arrayWord);s
							blinky.innerHTML = "Good Luck Chum" + "<br><br>" + "Good One!"	
							new Audio('assets/sounds/goodletter.mp3').play();
							inputsList.push(userInput);	

							//console.log(inputsList);						
						}
						else {
							inputsList.push(userInput);	
							blinky.innerHTML = "Good Luck Chum" + "<br><br>" + "No Match!"
							new Audio('assets/sounds/badletter.mp3').play();
							mainI++;
						}
					}
					else {
						blinky.innerHTML = "Good Luck Chum" + "<br><br>" + "Character No Good!"
						new Audio('assets/sounds/noletter.mp3').play();
					}

					//Array to string function
					displayWord = "";
					for (i = 0; i < wordLength; i++) {
						displayWord += arrayWord[i];
					}

					lives.innerHTML = "Lives: " + (10 - mainI);
					returnDisplay.innerHTML = displayWord;
					guessLetters.innerHTML = "Guesses:  " + "<div style='display: inline; letter-spacing: 4px; color: red;'>" + inputsList + "</div>"

					if (displayWord.indexOf(" - ") === -1) {
						winscore++;
						document.getElementById("winBox").innerHTML = "Wins: " + winscore
						blinky.innerHTML = "Beginner's Luck" + "<br><br>" + "Press Enter to continue"
						setTimeout(function() {new Audio(soundOfBenderWin[randomNumberForSound]).play();}, 2000);
						mainFunction();
					}
					else if (mainI === gameOver) {
						lossscore++;
						document.getElementById("lossBox").innerHTML = "Loss: " + lossscore
						blinky.innerHTML = "Hasta la vista Meatbag" + "<br><br>" + "Press Enter to continue"
						guessLetters.innerHTML = "The word is: " + bufferWord;
						setTimeout(function() {new Audio(soundOfBenderLoss[randomNumberForSound]).play();}, 2000);
						mainFunction();
					}								
				}
			}
		}
	}
}	