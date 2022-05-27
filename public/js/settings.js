
const settingsButton = document.querySelector(".settingsButton");

if (settingsButton) {
  
  settingsButton.addEventListener("click", (event) => {
    
    const existingSettingsContainer = document.querySelector(".settingsContainer");
    if (existingSettingsContainer) return existingSettingsContainer.remove();

    // Add game screen selector too
    const mainScreen = document.querySelector(".mainScreenBg");
    const settingsFragment = document.createDocumentFragment();
    const settingsContainer = document.createElement("div");
    settingsContainer.className = "settingsContainer";
    settingsContainer.innerHTML = `
            <h1>SETTINGS</h1>
            <div class="soundSettingsRow">
              <p>SOUND EFFECTS</p>
              <div class="onOffToggleButton"><h3></h3></div>
            </div>
            <div class="musicSettingsRow">
              <p>MUSIC</p>
              <div class="onOffToggleButton"><h3></h3></div>
            </div>
            <div class="closeSettingsContainer">
              <div class="logoutButton">
                <h4>LOG OUT</h4>
              </div>
              <div class="closeSettingsButton">
                <h4>CLOSE</h4>
              </div>
            </div>
          `;
    settingsFragment.appendChild(settingsContainer);
    mainScreen.appendChild(settingsFragment);

    // Add button text
    const fxToggle = document.querySelector(".soundSettingsRow .onOffToggleButton");
    const fxToggleInnerText = document.querySelector(".soundSettingsRow .onOffToggleButton h3");
    const musicToggle = document.querySelector(".musicSettingsRow .onOffToggleButton");
    const musicToggleInnerText = document.querySelector(".musicSettingsRow .onOffToggleButton h3");


    
    /** Sound variables
     * @param {boolean} - let fxState
     * @param {boolean} - let musicState
     */
    
    if (fxState) {
      fxToggleInnerText.innerText = "ON";
    } else {
      fxToggleInnerText.innerText = "OFF";
    }

    if (musicState) {
      musicToggleInnerText.innerText = "ON";
    } else {
      musicToggleInnerText.innerText = "OFF";
    }
    
    // Toggle FX
    fxToggle.addEventListener("click", (event) => {
      if (fxToggleInnerText.innerText === "ON") {
        fxToggleInnerText.innerText = "OFF";
        fxState = false;
        typeSound.muted = true;
        errorSound.muted = true;
        correctSound.muted = true;
        delSound.muted = true;
        sendSound.muted = true;
      } else {
        fxToggleInnerText.innerText = "ON";
        fxState = true;
        typeSound.muted = false;
        errorSound.muted = false;
        correctSound.muted = false;
        delSound.muted = false;
        sendSound.muted = false;
      }
    })

    // Toggle Music
    musicToggle.addEventListener("click", (event) => {
      if (musicToggleInnerText.innerText === "ON") {
        musicToggleInnerText.innerText = "OFF";
        musicState = false;
        battleMusic.muted = true;
      } else {
        musicToggleInnerText.innerText = "ON";
        musicState = true;
        battleMusic.muted = false;
      }
    })

    // Close settings container
    const closeSettingsButton = document.querySelector(".closeSettingsContainer .closeSettingsButton");
    closeSettingsButton.addEventListener("click", (event) => {
      const settingsContainer = document.querySelector(".settingsContainer");
      settingsContainer.remove();
    })
    
  })

}