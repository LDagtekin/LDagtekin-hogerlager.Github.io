

document.addEventListener("DOMContentLoaded", function () {
  // HTML codes
  const computerCredits = document.querySelector(".computer-credits");
  const playerCredits = document.querySelector(".player-credits");
  const computerDiceOne = document.querySelector(".computer-dice-one");
  const computerDiceTwo = document.querySelector(".computer-dice-two");
  const playerDiceOne = document.querySelector(".player-dice-one");
  const playerDiceTwo = document.querySelector(".player-dice-two");
  const messageBox = document.querySelector(".message-box");
  const diceButton = document.querySelector(".dice-button");
  const higherButton = document.querySelector(".higher-button");
  const lowerButton = document.querySelector(".lower-button");
  const goButton = document.querySelector(".go-button");

  let computerScore = 0;
  let playerScore = 0;
  let computerRoll1, computerRoll2, playerRoll1, playerRoll2;
  let playerHasGuessed = false; 

  // RNG
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Waarde
  function updateDiceAndCheckResult() {
    computerRoll1 = rollDice();
    computerRoll2 = rollDice();
    playerRoll1 = rollDice();
    playerRoll2 = rollDice();

    computerDiceOne.textContent = String.fromCodePoint(9855 + computerRoll1);
    computerDiceTwo.textContent = String.fromCodePoint(9855 + computerRoll2);
    playerDiceOne.textContent = String.fromCodePoint(9855 + playerRoll1);
    playerDiceTwo.textContent = String.fromCodePoint(9855 + playerRoll2);

    if (!playerHasGuessed) {
      // Knoppen aan als niet gekozen is.
      higherButton.disabled = false;
      lowerButton.disabled = false;
      messageBox.textContent = "Maak een keuze: Hoger of Lager.";
    } else {
      const result = playerRoll1 + playerRoll2 - computerRoll1 - computerRoll2;

      if ((result > 0 && playerHasGuessed === "Hoger") || (result < 0 && playerHasGuessed === "Lager")) {
        playerScore++;
        playerCredits.textContent = playerScore;
        messageBox.textContent = "Gewonnen! Goed gedaan.";
      } else {
        computerScore++;
        computerCredits.textContent = computerScore;
        messageBox.textContent = "Verloren. Beter geluk de volgende keer.";
      }

      // Uitgeschakeld
      higherButton.disabled = true;
      lowerButton.disabled = true;
    }
  }

  // Knoppen
  diceButton.addEventListener("click", () => {
    updateDiceAndCheckResult();
    playerHasGuessed = false; // Reset de gokstatus van de speler.
  });

  higherButton.addEventListener("click", () => makeGuess("higher"));
  lowerButton.addEventListener("click", () => makeGuess("lower"));
  goButton.addEventListener("click", startNewGame);

  function makeGuess(guess) {
    if (!playerHasGuessed) {
      playerHasGuessed = guess;
      messageBox.textContent = `Je hebt gegokt: ${guess}.`;
    }
  }

  function startNewGame() {
    playerScore = 0;
    playerCredits.textContent = playerScore;
    computerScore = 0;
    computerCredits.textContent = computerScore;
    messageBox.textContent = "Druk op Go om het spel te starten.";
    goButton.disabled = false;
    playerHasGuessed = false; // Reset gokstatus van speler.
    higherButton.disabled = false;
    lowerButton.disabled = false;
  }
});