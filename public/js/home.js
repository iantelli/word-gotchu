
// window.addEventListener("click", function () {})
// Change to window event listener and update variables

// Toggle gotchus page
const gotchuButton = document.querySelector(".gotchuButton");
gotchuButton.addEventListener("click", function () {

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
                <p>LVL <%= pet.lvl %></p>
            </div>
            <div class="XPBar">
                <p>XP <%= pet.xp %>/100 </p>
            </div>
        </div>
        <div class="gotchuCharacter"></div>
        <div class="abilityAndStoryContainer">
            <div class="storyButton"></div>
            <div class="abilityButton"></div>
        </div>
    </div>

    <div class="bottomBar">
        <div class="catchuIcon selected"></div>
        <div class="dogchuIcon locked"></div>
        <div class="turtlechuIcon"></div>
    </div>`;

    const body = document.querySelector("body");
    body.appendChild(gotchusPageContainer);

    // Add lock icon to locked characters
    const lockedIcons = document.querySelectorAll(".bottomBar .locked");
    lockedIcons.forEach(icon => {
      const blackLockIcon = document.createElement("div");
      blackLockIcon.classList.add("blackLockedIcon");
      icon.appendChild(blackLockIcon);
    })

    // Back button listener
    const backButton = document.querySelector(".topBar .backButton");
    backButton.addEventListener("click", function () {

      const mainScreen = document.createElement("div");
      mainScreen.className = "mainScreenBg";
      mainScreen.innerHTML = `    
      <div class="topNav">
          <div class="userBar">
              <div class="userProfileBg"></div>
              <div class="userName"><%= data.username %></div>
          </div>
          <div class="gotchuCoinBar">
              <div class="gotchuCoinIcon"></div>
              <div class="gotchuCoinAmount"><%= data.playerCurrency %></div>
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
        <div class="storyText">
            <p class="lvl1"></p>
        </div>
        <h4 class="storyLevelTitle">LVL02 STORY</h4>
        <div class="locked">
            <div class="lockIcon"></div>
            <p class="lvl2"></p>
        </div>
        <h4 class="storyLevelTitle">LVL03 STORY</h4>
        <div class="locked">
            <div class="lockIcon"></div>
            <p class="lvl3"></p>
        </div>
        `;
      gotchusPageContainer.appendChild(storyPopup);
      gotchusPageContainer.classList.remove("hidden");
      return;
    })
    
    // Toggle ability popup
    const abilityButton = document.querySelector(".abilityButton");
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
            <div class="description"></div>
        </div>
      </div>
      <div class="middleRow">
          <div class="catchuAbility2"></div>
          <div class="abilityText">
              <p>LVL02 ABILITY</p>
              <div class="description"></div>                
          </div>
          
      </div>
      <div class="bottomRow">
          <div class="catchuAbility3"></div>
          <div class="abilityText">
              <p>LVL03 ABILITY</p>
              <div class="description"></div>                
          </div>
      </div>
      `;
      gotchusPageContainer.appendChild(abilityPopup);
      gotchusPageContainer.classList.remove("hidden");
      return;
    })

    // Populate text boxes
    /*
      const username
      const playerCurrency
      const petLvl
      const petXP
      const petStory1
      const petStory2
      const petStory3
    */
})

