window.addEventListener("click", function (event) {
  const targetClasslist = event.target.className.split(" ");
  console.log(targetClasslist)
  if (targetClasslist.includes("checkOtherResultRight")) {

    // Swap button visibility
    const leftButton = document.querySelector(".checkOtherResultLeft");
    event.target.classList.add("hidden");
    leftButton.classList.remove("hidden");

    // Swap names
    const displayName = document.querySelector(".roundSummaryContainer .nameResultsText");
    displayName.innerText = "Opponent Results";

    // Get opponent results from db
    const opponentData = {
      correctWordles: 0,
      greenLetters: 3,
      yellowLetters: 1,
      firstAttempts: 0,
    };

    const displayTotalWordles = document.querySelector(".roundSummaryContainer .summaryText .wordleResults .results");
    const displayTotalGreens = document.querySelector(".roundSummaryContainer .summaryText .greenResults .results");
    const displayTotalYellows = document.querySelector(".roundSummaryContainer .summaryText .yellowResults .results");
    const displayTotalAttempts = document.querySelector(".roundSummaryContainer .summaryText .firstAttemptResults .results");

    // Display opponent results
    displayTotalWordles.innerText = opponentData.correctWordles;
    displayTotalGreens.innerText = opponentData.greenLetters;
    displayTotalYellows.innerText = opponentData.yellowLetters;
    displayTotalAttempts.innerText = opponentData.firstAttempts;

    // Swap user damage for opponent total damage
    const opponentTotalDamageDisplay = document.querySelector(".roundSummaryContainer .opponentDamageTotal");
    const userTotalDamageDisplay = document.querySelector(".roundSummaryContainer .playerDamageTotal");
    userTotalDamageDisplay.classList.add("hidden");
    opponentTotalDamageDisplay.classList.remove("hidden");

  }

  if (targetClasslist.includes("checkOtherResultLeft")) {

    // Swap button visibility
    const rightButton = document.querySelector(".checkOtherResultRight");
    event.target.classList.add("hidden");
    rightButton.classList.remove("hidden");

    // Swap names
    const displayName = document.querySelector(".roundSummaryContainer .nameResultsText");
    displayName.innerText = "Your Results";

    // Get user results back from db
    const userData = {
      correctWordles: 2,
      greenLetters: 4,
      yellowLetters: 3,
      firstAttempts: 1,
    };

    const displayTotalWordles = document.querySelector(".roundSummaryContainer .summaryText .wordleResults .results");
    const displayTotalGreens = document.querySelector(".roundSummaryContainer .summaryText .greenResults .results");
    const displayTotalYellows = document.querySelector(".roundSummaryContainer .summaryText .yellowResults .results");
    const displayTotalAttempts = document.querySelector(".roundSummaryContainer .summaryText .firstAttemptResults .results");

    // Display user results
    displayTotalWordles.innerText = userData.correctWordles;
    displayTotalGreens.innerText = userData.greenLetters;
    displayTotalYellows.innerText = userData.yellowLetters;
    displayTotalAttempts.innerText = userData.firstAttempts;

    // Swap opponent damage for user total damage
    const opponentTotalDamageDisplay = document.querySelector(".roundSummaryContainer .opponentDamageTotal");
    const userTotalDamageDisplay = document.querySelector(".roundSummaryContainer .playerDamageTotal");
    opponentTotalDamageDisplay.classList.add("hidden");
    userTotalDamageDisplay.classList.remove("hidden");

  }

});