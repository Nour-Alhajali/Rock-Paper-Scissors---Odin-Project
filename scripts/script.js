function playGame() {
  let computerScore = 0;
  let humanScore = 0;

  const button_rock = document.querySelector("#button_rock");
  const button_paper = document.querySelector("#button_paper");
  const button_scissors = document.querySelector("#button_scissors");

  const computerChoiceImage = document.querySelector("#computer-choice");
  const humanChoiceImage = document.querySelector("#human-choice");

  const humanScoreLabel = document.querySelector("#human-score");
  const computerScoreLabel = document.querySelector("#computer-score");

  const infoText = document.querySelector("#info-text");

  const roundWonAudio = document.querySelector("#round-won-audio");
  const roundLostAudio = document.querySelector("#round-lost-audio");
  const roundTiedAudio = document.querySelector("#round-tied-audio");

  document.addEventListener("click", (event) => {
    if (
      event.target === button_rock ||
      event.target === button_paper ||
      event.target === button_scissors
    ) {
      let computerChoice = getComputerChoice();
      let computerChoiceImageURL = getComputerChoiceImage(computerChoice);
      let humanChoice;
      let humanChoiceImageURL;

      //Set humanChoice and humanChoiceImage and apply image according the choice button pressed
      switch (event.target) {
        case button_rock:
          humanChoice = "rock";
          humanChoiceImageURL = "assets/images/rock.png";
          humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL})`;
          break;
        case button_paper:
          humanChoice = "paper";
          humanChoiceImageURL = "assets/images/paper.png";
          humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL}); background-position: 40%`;

          break;
        case button_scissors:
          humanChoice = "scissors";
          humanChoiceImageURL = "assets/images/scissors.png";
          humanChoiceImage.style.cssText = `background-image: url(${humanChoiceImageURL});`;

          break;
      }
      if (computerChoice == "paper") {
        computerChoiceImage.style.cssText = `background-image: url(${computerChoiceImageURL}); background-position: 40%`;
      } else {
        computerChoiceImage.style.cssText = `background-image: url(${computerChoiceImageURL});`;
      }

      playRound(humanChoice, computerChoice);
      editScoreLabels(humanScore, computerScore);

      if (humanScore >= 5 || computerScore >= 5) {
        alert(evaluateScores(humanScore, computerScore));
        resetGame();
      }
    }
  });

  function playRound(humanChoice, computerChoice) {
    let result = evaluateChoices(humanChoice, computerChoice);
    editInfoText(result);
    styleChoiceImages(result);
    playRoundResultAudio(result);

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

  function editInfoText(result) {
    switch (result) {
      case "win":
        infoText.textContent = "Round Won";
        break;
      case "lose":
        infoText.textContent = "Round Lost";
        break;
      case "tie":
        infoText.textContent = "Round Tied";
        break;
      default:
        infoText.textContent = "Pick A Chioce";
        break;
    }
  }
  function editScoreLabels(humanScore, computerScore) {
    humanScoreLabel.textContent = String(humanScore);
    computerScoreLabel.textContent = String(computerScore);
  }
  function resetGame() {
    humanScore = 0;
    computerScore = 0;
    editScoreLabels(humanScore, computerScore);
    editInfoText(infoText, "");
    styleChoiceImages("");

    humanChoiceImage.style.cssText = "background-image: url('#')";
    computerChoiceImage.style.cssText = "background-image: url('#')";
  }
  function styleChoiceImages(result) {
    const wonClass = "choice-UI-won";
    const lostClass = "choice-UI-lost";

    //Remove any present result styles
    humanChoiceImage.classList.remove(wonClass, lostClass);
    computerChoiceImage.classList.remove(wonClass, lostClass);

    //style according to result
    switch (result) {
      case "win":
        humanChoiceImage.classList.toggle(wonClass);
        computerChoiceImage.classList.toggle(lostClass);
        break;

      case "lose":
        humanChoiceImage.classList.toggle(lostClass);
        computerChoiceImage.classList.toggle(wonClass);
        break;
    }
  }
  function playRoundResultAudio(result) {
    switch (result) {
      case "win":
        roundWonAudio.play();
        break;
      case "lose":
        roundLostAudio.play();
        break;
      case "tie":
        roundTiedAudio.play();
        break;
    }
  }
}

playGame();
