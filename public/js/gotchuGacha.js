
window.onclick = function (event) {

  // Init gacha sounds
  let gachaSound = new Audio("/sounds/Gacha_Sound.wav");    
  gachaSound.load();
  gachaSound.volume = 0.15;

  const targetClassList = event.target.className.split(" ");

  // Change this to the manage page instead of homepage or make an all gotchus page?
  if (targetClassList.includes("viewGotchusButton")) {
    backSound.play();
    // document.querySelector(".mainScreenBg").classList.toggle("hidden");
    // document.querySelector(".gotchuBg").classList.toggle("hidden");
    return;
  }

  if (targetClassList.includes("gachaRollButton")) {

    // Subtract currency
    // Sync with db or something
    const currencyBar = document.querySelector(".gachaBg .gotchuCoinAmount");
    let currencyAmount = parseInt(currencyBar.innerText);
    currencyBar.innerText = currencyAmount - 1000;

    // Play sound
    gachaSound.play();

    // Get random number with crypto
    const byteArray = new Uint8Array(1);
    const cryptoNumber = Number(window.crypto.getRandomValues(byteArray)[0]);

    // Get gacha result
    let gachaResult;
    if (cryptoNumber >= 0 && cryptoNumber <= 51) {
      gachaResult = "catchu";
    }

    if (cryptoNumber >= 52 && cryptoNumber <= 102) {
      gachaResult = "dogchu";
    }

    if (cryptoNumber >= 102 && cryptoNumber <= 153) {
      gachaResult = "turtlechu";
    }
    
    if (cryptoNumber >= 153 && cryptoNumber <= 204) {
      gachaResult = "mousechu";
    }

    if (cryptoNumber >= 204 && cryptoNumber <= 255) {
      gachaResult = "raccoonchu";
    }


    console.log(cryptoNumber, gachaResult);

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
    const viewGotchusButton = document.querySelector(".gachaBg .viewGotchusButton");
    const homeButton = document.querySelector(".gachaBg .homeButton");
    rollButton.classList.add("disable");
    viewGotchusButton.classList.add("disable");
    homeButton.classList.add("disable");

    // Dim Background

    // Clean up page
    const gachaResultContainer = document.querySelector(".gachaResultContainer");
    const allGachaResultContainers = document.querySelectorAll(".gachaResultContainer");
    gachaResultContainer.addEventListener("click", () => {
      allGachaResultContainers.forEach(container => container.remove()); 

      // Re-enable buttons
      rollButton.classList.remove("disable");
      viewGotchusButton.classList.remove("disable");
      homeButton.classList.remove("disable");

    });


  }

}