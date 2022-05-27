
// Still need to change some of the listeners
window.onload = () => {
  music.menuMusic.play();
}
window.addEventListener("click", function (event) {
  const targetClasslist = event.target.className.split(" ");

  // Open gotchu selection page
  if (targetClasslist.includes("gotchuButton")) {

    // Need to fill xp, level, and story boxes with js
    sfx.uiSound.play();
    const mainScreen = document.querySelector(".mainScreenBg");
    mainScreen.classList.add("hidden");

    const gotchuPageFragment = document.createDocumentFragment();
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
                <div class="catchuIcon"></div>
                <div class="dogchuIcon"></div>
                <div class="turtlechuIcon"></div>
            </div>`;

    const body = document.querySelector("body");
    gotchuPageFragment.appendChild(gotchusPageContainer);
    body.appendChild(gotchuPageFragment);
    populateGotchuPage(petLvl, petXP);

    // Add lock icon to locked characters
    const lockedIcons = document.querySelectorAll(".bottomBar .locked");
    lockedIcons.forEach(icon => {
      const blackLockIcon = document.createElement("div");
      blackLockIcon.classList.add("lockedCharacter");
      icon.appendChild(blackLockIcon);
    })

    // Back button listener to return to original homepage
    const backButton = document.querySelector(".topBar .backButton");
    backButton.addEventListener("click", function () {
      sfx.removeLetter.play();
      gotchusPageContainer.remove();

      const mainScreen = document.querySelector(".mainScreenBg");
      mainScreen.classList.remove("hidden");

      populateHomepage(username || "Guest", playerCurrency);
    })

    // Toggle story popup
    const storyButton = document.querySelector(".storyButton");
    storyButton.addEventListener("click", function () {
      sfx.uiSound.play();
      const existingStoryPopup = document.querySelector(".storyPopup");
      const existingAbilityPopup = document.querySelector(".abilityContainer");
      if (existingStoryPopup) return existingStoryPopup.remove();
      if (existingAbilityPopup) existingAbilityPopup.remove();

      const storyFragment = document.createDocumentFragment();
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
      storyFragment.appendChild(storyPopup);
      gotchusPageContainer.appendChild(storyFragment);
      gotchusPageContainer.classList.remove("hidden");
      populateStoryPage(petStory1, petStory2, petStory3);
      return;
    })

    // Toggle ability popup
    const abilityButton = document.querySelector(".abilityButtonHome");
    abilityButton.addEventListener("click", function () {

      // Maybe don't need to add locked properties for abilities? Can add later if needed
      sfx.uiSound.play();
      const existingStoryPopup = document.querySelector(".storyPopup");
      const existingAbilityPopup = document.querySelector(".abilityContainer");
      if (existingStoryPopup) existingStoryPopup.remove();
      if (existingAbilityPopup) return existingAbilityPopup.remove();

      const abilityFragment = document.createDocumentFragment();
      const abilityPopup = document.createElement("div");
      abilityPopup.className = "abilityContainer";
      abilityPopup.innerHTML = `
          <div class="topRow">
            <div class="ability1Icon"></div>
            <div class="abilityText">
                <p>LVL01 ABILITY</p>
                <div class="description">
                  <p class="ability1"></p>
                </div>
            </div>
          </div>
          <div class="middleRow">
              <div class="ability2Icon"></div>
              <div class="abilityText">
                  <p>LVL02 ABILITY</p>
                  <div class="description">
                    <p class="ability2"></p>
                  </div>                
              </div>
              
          </div>
          <div class="bottomRow">
              <div class="ability3Icon"></div>
              <div class="abilityText">
                  <p>LVL03 ABILITY</p>
                  <div class="description">
                    <p class="ability3"></p>
                  </div>                
              </div>
          </div>
          `;
      abilityFragment.appendChild(abilityPopup);
      gotchusPageContainer.appendChild(abilityFragment);
      gotchusPageContainer.classList.remove("hidden");
      populateAbilityPage(petAbility1, petAbility2, petAbility3);
      return;
    })

  }

  // Swap gotchus on manage gotchu page

  // Save the current gotchu somewhere and reference it so it will dynamically assign the default one

  const allGotchuIcons = ["catchuIcon", "dogchuIcon", "turtlechuIcon"];

  if (allGotchuIcons.includes(targetClasslist[0])) {
    sfx.uiSound.play();
    const selectedGotchu = document.querySelector(".manageGotchusContainer .bottomBar ." + targetClasslist[0]);
    const previousSelectedGotchu = document.querySelectorAll(".manageGotchusContainer .bottomBar .selected");
    const gotchu = targetClasslist[0].split("Icon")[0];
    const gotchuContainer = document.querySelector(".manageGotchusContainer .centerContent .gotchuCharacter");
    previousSelectedGotchu.forEach(gotchu => {
      gotchu.classList.remove("selected");
      gotchu.innerHTML = "";
    });
    selectedGotchu.classList.add("selected");
    gotchuContainer.className = "gotchuCharacter " + gotchu;
    playerGotchu = gotchu;

    selectedGotchu.innerHTML = `<p class="selectedText">SELECTED</p>`;
  }

})

// Populate text boxes

// Should get firebase db snapshot for data
/**
 * Required Variables
 * const username @param {string}
 * const playerCurrency @param {int}
 * const petLvl @param {int}
 * const petXP @param {int}
 * const petStory1 @param {string}
 * const petStory2 @param {string}
 * const petStory3 @param {string}
 * const petAbility1 @param {string}
 * const petAbility2 @param {string}
 * const petAbility3 @param {string}
*/

const populateHomepage = (username, playerCurrency) => {
  const usernameDiv = document.querySelector(".mainScreenBg .userBar .userName");
  const currencyDiv = document.querySelector(".mainScreenBg .gotchuCoinBar .gotchuCoinAmount");
  usernameDiv.innerText = username;
  currencyDiv.innerText = playerCurrency;

  const gotchuDiv = document.querySelector(".mainScreenBg .gotchuCharacter");
  gotchuDiv.innerHTML = `<div class="${playerGotchu}"></div>`;
}

const populateGotchuPage = (petLvl, petXP) => {
  const levelBarTextBox = document.querySelector(".levelBar p");
  const XPBarTextBox = document.querySelector(".XPBar p");
  levelBarTextBox.innerText = `LVL ${petLvl}`;
  XPBarTextBox.innerText = `XP ${petXP}/100`;

  // Assign default pet maybe or get pet from db
  const selectedGotchu = playerGotchu;
  const selectedGotchuIcon = document.querySelector(`.manageGotchusContainer .bottomBar .${playerGotchu}Icon`);
  selectedGotchuIcon.classList.add("selected");
  selectedGotchuIcon.innerHTML = `<p class="selectedText">SELECTED</p>`;

  // const selectedGotchu = (selectedGotchuIcon.className.split(" ")[0]).split("Icon")[0];
  const gotchuContainer = document.querySelector(".manageGotchusContainer .centerContent .gotchuCharacter");
  gotchuContainer.classList.add(selectedGotchu);

}

const populateStoryPage = () => {
  const selectedGotchu = playerGotchu;
  let petStory1;
  let petStory2;
  let petStory3;
  if (selectedGotchu == "catchu") {
    petStory1 = "Raised in a young family where everybody was always busy, Catchu tried to get its owners attention by meowing, but was always ignored. One day, it accidentally broke a mug when it hopped onto the table to get closer to the owners, and noticed that they took the time to teach Catchu to not do that.";
    petStory2 = "Catchu became a sort of prankster, realising it could gain the owners attention by causing trouble. Catchu thrived off the attention, and continued to come up with ways to cause chaos. It became difficult for Catchu when a newborn was introduced into the family, with its crying always beckoning the calls of the family.";
    petStory3 = " Catchu decided to do a prank where it would be quiet with the newborn under thick blankets and try to scare the parents by jumping out of the blankets last minute. Instead of being met with sighs and chastizing, the parents screamed in terror at Catchu. What happened next was a blur to Catchu, but it found itself in a white room, drifting off asleep only to wake up with devil horns and a tail. ";
  }

  if (selectedGotchu == "dogchu") {
    petStory1 = "A shiba inu, this Dogchu is soft spoken and good to the bone. Dogchu was raised by a sweet elder lady who loved Dogchu dearly. Every day the elder lady would head out to gather food and come home to their little cottage before sunset where they would enjoy dinner together.";
    petStory2 = "One day, Dogchu waited outside the cottage for its sweet owner to come home. Eventually, night time fell and the elder lady was no where to be seen. Being devoted and patient, this Dogchu continued to wait as it got colder and darker.";
    petStory3 = "Dogchu waited days after days in the cold, never once leaving their spot on the cottage’s porch. Eventually, Dogchu woke up after feeling the coldest it had ever felt before the night prior. Dogchu looked up to find its owner smiling down at them and they felt warmth and lightness around them again.  ";
  }

  if (selectedGotchu == "turtlechu") {
    petStory1 = "This Turtlechu was always a confident turtle. It was the fastest and stealthiest young turtle of its village. Turtlechu was smug because of this, often making fun of its weaker classmates and thus Turtlechu became a bit of an outcast.";
    petStory2 = "Turtlechu continued to excel in its ninja classes, but one night during a mission, Turtlechu got too cocky and hurt themself in the process, permanently blinding an eye. Helpless, it layed there injured in the forest, feeling alone. That’s when the weakest turtle in its class spotted Turtlechu’s body and helped";
    petStory3 = "Since that day, Turtlechu made a best friend in the other turtle. Turtlechu came to realize that the greatest weakness of all, was his cockiness, and since has humbled. The Turtlechu strived to become the greatest ninja of all in order to protect others and to help others find strength.";
  }

  const story1 = document.querySelector(".story .lvl1");
  const story2 = document.querySelector(".story .lvl2");
  const story3 = document.querySelector(".story .lvl3");
  story1.innerText = petStory1;
  story2.innerText = petStory2;
  story3.innerText = petStory3;
}

// Should change to support different pets as a variable
const populateAbilityPage = () => {
  const selectedGotchu = playerGotchu;
  const ability1Icon = document.querySelector(".ability1Icon");
  const ability2Icon = document.querySelector(".ability2Icon");
  const ability3Icon = document.querySelector(".ability3Icon");
  ability1Icon.className = `${selectedGotchu}Ability100`;
  ability2Icon.className = `${selectedGotchu}Evo2Ability100`;
  ability3Icon.className = `${selectedGotchu}Evo3Ability100`;
  ability1Icon.style.transform = "scale(0.6)";
  ability2Icon.style.transform = "scale(0.6)";
  ability3Icon.style.transform = "scale(0.6)";
  ability1Icon.style.marginTop = "-1.5em";
  ability2Icon.style.marginTop = "-1.5em";
  ability3Icon.style.marginTop = "-1.5em";
  const ability1 = document.querySelector(`.description p.ability1`);
  const ability2 = document.querySelector(`.description p.ability2`);
  const ability3 = document.querySelector(`.description p.ability3`);

  let petAbility1;
  let petAbility2;
  let petAbility3;

  if (selectedGotchu == "catchu") {
    petAbility1 = "Bad Luck: Deals damage to the opponent for 1-4 damage (Roll a 1d4).";
    petAbility2 = "Very Bad Luck: Deals damage to the opponent for 1-6 damage (Roll a 1d6).";
    petAbility3 = "Super Bad Luck: Deals damage to the opponent for 1-8 damage (Roll a 1d8).";
  }

  if (selectedGotchu == "dogchu") {
    petAbility1 = "Good Dog: Helps you find one Yellow letter in your current Wordle.";
    petAbility2 = "Great Dog: Helps you find two Yellow letters in your current Wordle.";
    petAbility3 = "Best Dog: Helps you find one Green letter in your current Wordle.";
  }

  if (selectedGotchu == "turtlechu") {
    petAbility1 = "Hard Shell: Creates a shield that prevents 5 DMG.";
    petAbility2 = "Harder Shell: Creates a shield that prevents 10 DMG.";
    petAbility3 = "Hardest Shell: Creates a shield that prevents 15 DMG.";
  }

  ability1.innerText = petAbility1;
  ability2.innerText = petAbility2;
  ability3.innerText = petAbility3;
}



firebase.auth().onAuthStateChanged((user) => {
  // console.log(user)
  if (user) {
      console.log("user")
      username = user.displayName
      populateHomepage(user.displayName || "Guest", playerCurrency);
  } else {
      window.location.href = "/"
  }
})