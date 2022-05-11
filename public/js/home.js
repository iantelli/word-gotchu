const popupDiv = document.querySelector(".popups");
const gotchuButton = document.querySelector(".gotchuButton");
const gotchuCharacter = document.querySelector(".gotchuCharacter");
gotchuButton.addEventListener("click", function() {

    // Use "storyText" class if unlocked, "locked" if locked
    // Should use some sort of conditional to check and grab correct pet story, or just send all with hidden class?

    // Also should probably zswap this code out for the actual page

    const storyPopup = document.createElement("div");
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
    <div class="locked lvl3">
        <div class="lockIcon"></div>
        <p class="lvl3"></p>
    </div>
    `;
    popupDiv.appendChild(storyPopup);
    popupDiv.classList.remove("hidden");
    gotchuCharacter.classList.add("hidden");
    return;
})