
// global variables
const rpsChoices = ['rock', 'paper', 'scissors'];
let computerScore;
let userScore;

// save outcome table for reset
const outcomeTable = document.querySelector("#outcomeTable");
outcomeTable.oldHTML = outcomeTable.innerHTML;

// new game
const playAgain = document.querySelector(".resetGame");
playAgain.addEventListener("click", startGame);

function startGame() {
  // track and display scores
  computerScore = 0;
  updateComputerScore();

  userScore = 0;
  updateUserScore();

  // reset any game outcomes
  outcomeTable.innerHTML = outcomeTable.oldHTML;
  document.querySelector(".finalOutcome").innerHTML = "";

  const choiceButtons = document.querySelectorAll(".choiceButton");
  choiceButtons.forEach(btn => btn.addEventListener("click", playRound));

  playAgain.style.visibility = "hidden";

  document.querySelector("#userScore").classList.remove("winnerBlock");
  document.querySelector("#computerScore").classList.remove("winnerBlock");
}

function updateComputerScore() {
  document.querySelector("#computerScore .score").innerHTML = computerScore;
}

function updateUserScore() {
  document.querySelector("#userScore .score").innerHTML = userScore;
}

function playRound(e) {
  const userSelection = e.srcElement.getAttribute("choiceName");

  // Get random choice from computer
  const computerIndex = Math.floor(Math.random() * 3);
  const computerSelection = rpsChoices[computerIndex];

  // Compare choices and save outcome
  let outcome;
  if (userSelection == computerSelection) {
    outcome = 'tie';
  } else if (userSelection == 'rock') {
    outcome = computerSelection == 'scissors' ? 'win' : 'lose';
  } else if (userSelection == 'paper') {
    outcome = computerSelection == 'rock' ? 'win' : 'lose';
  } else if (userSelection == 'scissors') {
    outcome = computerSelection == 'paper' ? 'win' : 'lose';
  }

  addOutcomeRow(computerSelection, userSelection, outcome);

  if (outcome == "win") {
    userScore += 1;
    updateUserScore();
    if (userScore == 5) {
      endGame("win");
    }
  } else if (outcome == "lose") {
    computerScore += 1;
    updateComputerScore();
    if (computerScore == 5) {
      endGame("lose");
    }
  }
}

function addOutcomeRow(computerSelection, userSelection, outcome) {
  let roundNum = outcomeTable.rows.length;
  let newRow = outcomeTable.insertRow(roundNum);
  
  let cellRound = newRow.insertCell(0);
  cellRound.innerHTML = roundNum;

  let cellComputer = newRow.insertCell(1);
  cellComputer.innerHTML = computerSelection;

  let cellUser = newRow.insertCell(2);
  cellUser.innerHTML = userSelection;

  let cellOutcome = newRow.insertCell(3);
  cellOutcome.innerHTML = outcome;
};

function endGame(outcome) {
  if (outcome == "win") {
    document.querySelector("#userScore").classList.add("winnerBlock");
    outcomeString = "You win! &#9786;";
  } else if (outcome == "lose") {
    outcomeString = "You lose! &#9785;";
    document.querySelector("#computerScore").classList.add("winnerBlock");
  }

  document.querySelector(".finalOutcome").innerHTML = outcomeString;

  const choiceButtons = document.querySelectorAll(".choiceButton");
  choiceButtons.forEach(btn => btn.removeEventListener("click", playRound));

  playAgain.style.visibility = "visible";
}