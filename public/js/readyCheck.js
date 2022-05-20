
let selectedChar = 0;


window.onclick = function(event) {
    
    // Get this from user data in db
    const playerUnlockedChars = ["catchu", "dogchu", "turtlechu", "mousechu", "raccoonchu"];
    
    const targetClassList = event.target.className;

    // Find some way to confirm or lock the equipped character maybe validate with db as well
    
    // Next character button (right one)
    if (targetClassList.includes("nextCharacter")) {
        selectedChar++;
        if (selectedChar >= playerUnlockedChars.length) selectedChar = 0;
        const characterAvatar = document.querySelector(".playerCharacter .playerPetContainer > div");
        characterAvatar.className = playerUnlockedChars[selectedChar];
        return;
    }
    
    // Previous character button (left one)
    if (targetClassList.includes("previousCharacter")) {
        selectedChar--;
        if (selectedChar < 0) selectedChar = playerUnlockedChars.length - 1;
        const characterAvatar = document.querySelector(".playerCharacter .playerPetContainer > div");
        characterAvatar.className = playerUnlockedChars[selectedChar];
        return;
    }
    
    // Ready button
    if (targetClassList.includes("readyButton")) {

        // Get this id from url or query
        const gameID = "abcdefg";

        return window.location.href = `/lobby/${gameID}`;
    }

}