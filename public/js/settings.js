
const settingsButton = document.querySelector(".settingsButton");

if (settingsButton) {

  settingsButton.addEventListener("click", (event) => {

    const existingProfileSettingsContainer = document.querySelector(".profileSettingsContainer");
    if (existingProfileSettingsContainer) return existingProfileSettingsContainer.remove();

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
        sfx.uiSound.mute(true);
        sfx.removeLetter.mute(true);
        sfx.gachaSound.mute(true);
      } else {
        fxToggleInnerText.innerText = "ON";
        fxState = true;
        sfx.uiSound.mute(false);
        sfx.removeLetter.mute(false);
        sfx.gachaSound.mute(false);
      }
    })

    // Toggle Music
    musicToggle.addEventListener("click", (event) => {
      if (musicToggleInnerText.innerText === "ON") {
        musicToggleInnerText.innerText = "OFF";
        musicState = false;
        music.menuMusic.mute(true);
      } else {
        musicToggleInnerText.innerText = "ON";
        musicState = true;
        music.menuMusic.mute(false);
      }
    })

    // Close settings container
    const closeSettingsButton = document.querySelector(".closeSettingsContainer .closeSettingsButton");
    closeSettingsButton.addEventListener("click", (event) => {
      const settingsContainer = document.querySelector(".settingsContainer");
      settingsContainer.remove();
    })

    // Log out container
    const logoutButton = document.querySelector(".closeSettingsContainer .logoutButton");
    logoutButton.addEventListener("click", (event) => {
      const settingsContainer = document.querySelector(".settingsContainer");
      settingsContainer.innerHTML = `
      <div class= "logoutContainer">
        <h1>LOG OUT?</h1>
        <h2> Are you sure you want to log out?
        <div class="closeSettingsContainer">
          <div class="yesButton">
            <h4>YES</h4>
          </div>
          <div class="noButton">
            <h4>NO</h4>
          </div>
        </div>
      </div>
    `;

    })

  })

}

const profileSettings = document.querySelector(".userBar");
if (profileSettings) {
  profileSettings.addEventListener("click", (event) => {
    sfx.uiSound.play();
    const existingSettingsContainer = document.querySelector(".settingsContainer");
    if (existingSettingsContainer) return existingSettingsContainer.remove();

    const existingProfileSettingsContainer = document.querySelector(".profileSettingsContainer");
    if (existingProfileSettingsContainer) return existingProfileSettingsContainer.remove();

    // Profile Settings Popup

    const mainScreen = document.querySelector(".mainScreenBg");
    const profileSettingsFragment = document.createDocumentFragment();
    const profileSettingsContainer = document.createElement("div");
    profileSettingsContainer.className = "profileSettingsContainer";
    profileSettingsContainer.innerHTML = `
            <h1>USERNAME</h1>
            <div class="userProfileIcon"></div>
            <div class="profileRow">
              <div class= "wins"><h3>Total Wins</h3><h3 class="winCount">5</h3></div>
              <div class= "losses"><h3>Total Losses</h3><h3 class="loseCount">2</h3></div>
              <div class= "winPercentage"><h3>Win Rate</h3><h3 class="winPercentageCount">70%</h3></div>
            </div>
              <div class="closeProfileButton">
                <h4>CLOSE</h4>
            </div>
          `;
    profileSettingsFragment.appendChild(profileSettingsContainer);
    mainScreen.appendChild(profileSettingsFragment);
    const closeProfileButton = document.querySelector(".closeProfileButton");
    closeProfileButton.addEventListener("click", (event) => {
      sfx.removeLetter.play();
      const profileSettingsContainer = document.querySelector(".profileSettingsContainer");
      profileSettingsContainer.remove();
    })
  })
}
document.addEventListener("click", event => {
  const targetClassList = event.target.className;
  if (targetClassList.includes("yesButton")) {
    firebase.auth().signOut()
      .then(function () {
        window.location.href = "/"
      }).catch(function(error) {
        window.alert(error.message)
      })
  }
  if (targetClassList.includes("noButton")) {
    const settingsContainer = document.querySelector(".settingsContainer");
    settingsContainer.remove();
  }
})