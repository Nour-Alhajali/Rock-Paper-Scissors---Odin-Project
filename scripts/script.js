function getComputerChoice() {
  let randomChance = Math.random();

  if (randomChance >= 0.66) {
    return "rock";
  } else if (randomChance >= 0.33) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  let humanChoice = prompt("Choose: Rock, Paper or Scissors");
  humanChoice = humanChoice.toLowerCase();
  if (
    humanChoice === "rock" ||
    humanChoice === "paper" ||
    humanChoice === "scissors"
  ) {
    return humanChoice;
  } else {
    console.log("Invalid Choice, Pick Again");
  }
}

function evaluateChoices(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    return "tie";
  } else {
    if (humanChoice == "rock") {
      switch (computerChoice) {
        case "paper":
          return "lose";
          break;
        case "scissors":
          return "win";
          break;
      }
    } else if (humanChoice == "paper") {
      switch (computerChoice) {
        case "scissors":
          return "lose";
          break;
        case "rock":
          return "win";
          break;
      }
    } else if (humanChoice == "scissors") {
      switch (computerChoice) {
        case "rock":
          return "lose";
          break;
        case "paper":
          return "win";
          break;
      }
    } else {
      return "invalid";
    }
  }
}

function playGame() {
  let computerScore = 0;
  let humanScore = 0;

  for (let i = 0; i < 5; i++) {
    console.log("Round " + i);

    let humanChoice = getHumanChoice();
    while (humanChoice === undefined) {
      humanChoice = getHumanChoice();
    }
    let computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
  }

  console.log(
    `Your Score: ${humanScore}\nComputer Score: ${computerScore}\n${evaluateScores(
      humanScore,
      computerScore
    )}`
  );

  function playRound(humanChoice, computerChoice) {
    let result = evaluateChoices(humanChoice, computerChoice);

    console.log(`You chose ${humanChoice} \nComputer chose ${computerChoice}`);
    switch (result) {
      case "tie":
        console.log("It's a Tie!");
        break;
      case "win":
        console.log(`You Win! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
        break;
      case "lose":
        console.log(`You Lose! ${computerChoice} beats ${humanChoice}`);
        computerScore++;
        break;
    }
  }

  function evaluateScores(humanScore, computerScore) {
    if (humanScore === computerScore) {
      return "It's a Tie";
    } else if (humanScore > computerScore) {
      return "You Won";
    } else {
      return "You Lost";
    }
  }
}

playGame();
