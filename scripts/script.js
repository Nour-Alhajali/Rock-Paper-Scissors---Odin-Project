function playGame() {
  let computerScore = 0;
  let humanScore = 0;

  let button_rock = document.querySelector("#button_rock");
  let button_paper = document.querySelector("#button_paper");
  let button_scissors = document.querySelector("#button_scissors");

  let computerChoiceImage = document.querySelector("#computer-choice");
  let humanChoiceImage = document.querySelector("#human-choice");

  let humanScoreLabel = document.querySelector("#human-score");
  let computerScoreLabel = document.querySelector("#computer-score");

  document.addEventListener("click", (event) => {
    let computerChoice = getComputerChoice();
    let computerChoiceImageURL = getComputerChoiceImage(computerChoice);
    let humanChoice;
    let humanChoiceImageURL;

    //Set humanChoice and humanChoiceImage and apply image according the choice button pressed
    switch (event.target) {
      case button_rock:
        humanChoice = "rock";
        humanChoiceImageURL = "/assets/images/rock.png";
        humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL})`;
        break;
      case button_paper:
        humanChoice = "paper";
        humanChoiceImageURL = "/assets/images/paper.png";
        humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL}); background-position: 40%`;

        break;
      case button_scissors:
        humanChoice = "scissors";
        humanChoiceImageURL = "/assets/images/scissors.png";
        humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL});`;

        break;
    }
    computerChoiceImage.style.cssText = `background-image: url(${computerChoiceImageURL});`;
    playRound(humanChoice, computerChoice);
    humanScoreLabel.textContent = String(humanScore);
    computerScoreLabel.textContent = String(computerScore);
  });

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
  //Helper Functions
  function evaluateChoices(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      return "tie";
    } else {
      if (humanChoice === "rock") {
        switch (computerChoice) {
          case "paper":
            return "lose";
            break; // Excution won't reach this line, but i left it for overall readablity.
          case "scissors":
            return "win";
            break;
        }
      } else if (humanChoice === "paper") {
        switch (computerChoice) {
          case "scissors":
            return "lose";
            break;
          case "rock":
            return "win";
            break;
        }
      } else if (humanChoice === "scissors") {
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

  function getComputerChoiceImage(choice) {
    switch (choice) {
      case "rock":
        return "assets/images/rock.png";
      case "paper":
        return "assets/images/paper.png";
      case "scissors":
        return "assets/images/scissors.png";
    }
  }
}

playGame();
