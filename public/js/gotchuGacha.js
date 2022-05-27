
window.onclick = function (event) {

  const targetClassList = event.target.className.split(" ");

  if (targetClassList.includes("gachaRollButton")) {

    // Subtract currency
    // Sync with db or something
    const currencyBar = document.querySelector(".gachaBg .gotchuCoinAmount");
    let currencyAmount = parseInt(playerCurrency);
    currencyBar.innerText = currencyAmount - 1000;
    playerCurrency = currencyAmount - 1000;

    // Play sound
    sfx.gachaSound.play();

    // Get random number with crypto
    const byteArray = new Uint8Array(1);
    const cryptoNumber = Number(window.crypto.getRandomValues(byteArray)[0]);

    // Get gacha result
    let gachaResult;

    if (cryptoNumber >= 0 && cryptoNumber <= 85) {
      gachaResult = "catchu";
    }

    if (cryptoNumber >= 86 && cryptoNumber <= 171) {
      gachaResult = "dogchu";
    }

    if (cryptoNumber >= 172 && cryptoNumber <= 256) {
      gachaResult = "turtlechu";
    }

    // console.log(cryptoNumber, gachaResult);
    
    // Add rolled gotchu to owned gotchus

    const gachaFragment = new DocumentFragment();
    const rollResultPopup = document.createElement("div");
    rollResultPopup.className = "gachaResultContainer";
    rollResultPopup.innerHTML = `
      <h1 class="topText">Congratulations!</h1>
      <div class="gotchuContainer">
        <div class="${gachaResult}"></div>
      </div>
      <h1 class="middleText">Obtained ${gachaResult[0].toUpperCase()}${gachaResult.slice(1)}!</h1>
      <div class="closeGachaResult">
        <h3 class="bottomText">CLICK TO CONTINUE</h3>
      </div>
      `;
    gachaFragment.appendChild(rollResultPopup);
    document.querySelector(".gachaBg").appendChild(gachaFragment);

    // Disable buttons
    const rollButton = document.querySelector(".gachaBg .gachaRollButton");
    const homeButton = document.querySelector(".gachaBg .homeButton");
    rollButton.classList.add("disable");
    homeButton.classList.add("disable");

    // Dim Background

    // Clean up page
    const closeGachaResultButton = document.querySelector(".gachaBg .gachaResultContainer .closeGachaResult");
    closeGachaResultButton.addEventListener("click", () => {
      const allGachaResultContainers = document.querySelectorAll(".gachaResultContainer");
      allGachaResultContainers.forEach(container => container.remove()); 

      // Re-enable buttons
      rollButton.classList.remove("disable");
      homeButton.classList.remove("disable");

    });

  }

}