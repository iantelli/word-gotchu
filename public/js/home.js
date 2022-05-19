
// Change to window event listener and update variables

window.addEventListener("click", function (event) {
  const targetClasslist = event.target.className.split(" ");
  if (targetClasslist.includes("gotchuButton")) {

    // Need to fill xp, level, and story boxes with js

    const mainScreen = document.querySelector(".mainScreenBg");
    mainScreen.remove();

    const gotchusPageContainer = document.createElement("div");
    gotchusPageContainer.className = "manageGotchusContainer";
    gotchusPageContainer.innerHTML = `    
            <div class="topBar">
                <div class="backButton">
                    <h1>BACK</h1>
                </div>
                <h1>Select Gotchu</h1>
            </div>

            <div class="centerContent">
                <div class="levelAndXPContainer">
                    <div class="levelBar">
                        <p></p>
                    </div>
                    <div class="XPBar">
                        <p></p>
                    </div>
                </div>
                <div class="gotchuCharacter"></div>
                <div class="abilityAndStoryContainer">
                    <div class="storyButton"></div>
                    <div class="abilityButtonHome"></div>
                </div>
            </div>

            <div class="bottomBar">
                <div class="catchuIcon selected"></div>
                <div class="dogchuIcon locked"></div>
                <div class="turtlechuIcon"></div>
            </div>`;

    const body = document.querySelector("body");
    body.appendChild(gotchusPageContainer);
    populateGotchuPage(petLvl, petXP);

    // Add lock icon to locked characters
    const lockedIcons = document.querySelectorAll(".bottomBar .locked");
    lockedIcons.forEach(icon => {
      const blackLockIcon = document.createElement("div");
      blackLockIcon.classList.add("blackLockedIcon");
      icon.appendChild(blackLockIcon);
    })

    // Back button listener to return to original homepage
    const backButton = document.querySelector(".topBar .backButton");
    backButton.addEventListener("click", function () {

      const mainScreen = document.createElement("div");
      mainScreen.className = "mainScreenBg";
      mainScreen.innerHTML = `    
              <div class="topNav">
                  <div class="userBar">
                      <div class="userProfileBg"></div>
                      <div class="userName"></div>
                  </div>
                  <div class="gotchuCoinBar">
                      <div class="gotchuCoinIcon"></div>
                      <div class="gotchuCoinAmount"></div>
                  </div>
                  <div class="settings"></div>
              </div>
              
              <div class="gotchuCharacter"></div>
            
              <div class="bottomNav">
                  <div class="gotchuButton"></div>
                  <div class="gachaButton"></div>
                  <div class="gotchuDomeButton"></div>
              </div>`;

      body.appendChild(mainScreen);
      gotchusPageContainer.remove();
      populateHomepage(username, playerCurrency);
      goToGotchuDomeListener();

    })

    // Toggle story popup
    const storyButton = document.querySelector(".storyButton");
    storyButton.addEventListener("click", function () {

      const existingStoryPopup = document.querySelector(".storyPopup");
      const existingAbilityPopup = document.querySelector(".abilityContainer");
      if (existingStoryPopup) return existingStoryPopup.remove();
      if (existingAbilityPopup) existingAbilityPopup.remove();

      const storyPopup = document.createElement("div");
      storyPopup.className = "storyPopup";
      storyPopup.innerHTML = `
                <div class="storyContainer">
                <h4 class="storyLevelTitle topText">LVL01 STORY</h4>
                <div class="story storyText">
                    <p class="lvl1"></p>
                </div>
                <h4 class="storyLevelTitle">LVL02 STORY</h4>
                <div class="story locked">
                    <div class="lockIcon"></div>
                    <p class="lvl2"></p>
                </div>
                <h4 class="storyLevelTitle">LVL03 STORY</h4>
                <div class="story locked">
                    <div class="lockIcon"></div>
                    <p class="lvl3"></p>
                </div>
                `;
      gotchusPageContainer.appendChild(storyPopup);
      gotchusPageContainer.classList.remove("hidden");
      populateStoryPage(petStory1, petStory2, petStory3);
      return;
    })

    // Toggle ability popup
    const abilityButton = document.querySelector(".abilityButtonHome");
    abilityButton.addEventListener("click", function () {
    
      // Maybe don't need to add locked properties for abilities? Can add later if needed
    
      const existingStoryPopup = document.querySelector(".storyPopup");
      const existingAbilityPopup = document.querySelector(".abilityContainer");
      if (existingStoryPopup) existingStoryPopup.remove();
      if (existingAbilityPopup) return existingAbilityPopup.remove();
    
      const abilityPopup = document.createElement("div");
      abilityPopup.className = "abilityContainer";
      abilityPopup.innerHTML = `
          <div class="topRow">
            <div class="catchuAbility1"></div>
            <div class="abilityText">
                <p>LVL01 ABILITY</p>
                <div class="description">
                  <p class="ability1"></p>
                </div>
            </div>
          </div>
          <div class="middleRow">
              <div class="catchuAbility2"></div>
              <div class="abilityText">
                  <p>LVL02 ABILITY</p>
                  <div class="description">
                    <p class="ability2"></p>
                  </div>                
              </div>
              
          </div>
          <div class="bottomRow">
              <div class="catchuAbility3"></div>
              <div class="abilityText">
                  <p>LVL03 ABILITY</p>
                  <div class="description">
                    <p class="ability3"></p>
                  </div>                
              </div>
          </div>
          `;
      gotchusPageContainer.appendChild(abilityPopup);
      gotchusPageContainer.classList.remove("hidden");
      populateAbilityPage(petAbility1, petAbility2, petAbility3);
      return;
    })

  }

})

// Populate text boxes
// Should get firebase db snapshot for data
/*
  const username
  const playerCurrency
  const petLvl
  const petXP
  const petStory1
  const petStory2
  const petStory3
  const petAbility1
  const petAbility2
  const petAbility3
*/

// Change the link to not localhost
const populateHomepage = (username, playerCurrency) => {
  const usernameDiv = document.querySelector(".mainScreenBg .userBar .userName");
  const currencyDiv = document.querySelector(".mainScreenBg .gotchuCoinBar .gotchuCoinAmount");
  usernameDiv.innerText = username;
  currencyDiv.innerText = playerCurrency;
}

const goToGotchuDomeListener = () => {
  const gotchuDomeButton = document.querySelector(".gotchuDomeButton");
  gotchuDomeButton.addEventListener("click", function () {
    document.querySelector(".mainScreenBg").classList.toggle("hidden");
    document.querySelector(".gochuDome").classList.toggle("hidden");
  })
}

const populateGotchuPage = (petLvl, petXP) => {
  const levelBarTextBox = document.querySelector(".levelBar p");
  const XPBarTextBox = document.querySelector(".XPBar p");
  levelBarTextBox.innerText = `LVL ${petLvl}`;
  XPBarTextBox.innerText = `XP ${petXP}/100`;
}

const populateStoryPage = (petStory1, petStory2, petStory3) => {
  const story1 = document.querySelector(".story .lvl1");
  const story2 = document.querySelector(".story .lvl2");
  const story3 = document.querySelector(".story .lvl3");
  story1.innerText = petStory1;
  story2.innerText = petStory2;
  story3.innerText = petStory3;
}

// Should change to support different pets as a variable
const populateAbilityPage = (petAbility1, petAbility2, petAbility3) => {
  const pet = "catchu";
  const ability1 = document.querySelector(`.description p.ability1`);
  const ability2 = document.querySelector(`.description p.ability2`);
  const ability3 = document.querySelector(`.description p.ability3`);
  ability1.innerText = petAbility1;
  ability2.innerText = petAbility2;
  ability3.innerText = petAbility3;
}

populateHomepage(username, playerCurrency);
goToGotchuDomeListener();