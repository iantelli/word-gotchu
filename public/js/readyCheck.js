
let selectedChar = 0;
let playerId;
let playerRef;
let allPlayersRef;
let lobbyId = window.location.pathname.split("/")[2];
const playerUnlockedChars = ["catchu", "dogchu", "turtlechu"];

window.onclick = function (event) {

    // Get this from user data in db

    const targetClassList = event.target.className;

    // Find some way to confirm or lock the equipped character maybe validate with db as well

    // Next character button (right one)
    if (targetClassList.includes("nextCharacter")) {
        selectedChar++;
        if (selectedChar >= playerUnlockedChars.length) selectedChar = 0;
        const characterAvatar = document.querySelector(".playerCharacter .playerPetContainer > div");
        characterAvatar.className = playerUnlockedChars[selectedChar];
        playerRef.update({
            gotchu: playerUnlockedChars[selectedChar]
        })
        return;

    }

    // Previous character button (left one)
    if (targetClassList.includes("previousCharacter")) {
        selectedChar--;
        if (selectedChar < 0) selectedChar = playerUnlockedChars.length - 1;
        const characterAvatar = document.querySelector(".playerCharacter .playerPetContainer > div");
        characterAvatar.className = playerUnlockedChars[selectedChar];
        playerRef.update({
            gotchu: playerUnlockedChars[selectedChar]
        })
        return;
    }

    // Ready button
    if (targetClassList.includes("readyButton")) {
        playerRef.update({
            ready: true
        })
        document.querySelector("#readyButton").className = "notReadyButton";
    }
}

function init() {
    allPlayersRef.on("child_changed", (snapshot) => {
        const changedPlayer = snapshot.val();
        if (changedPlayer.id !== playerId) {
            document.querySelector("#opponentPet").className = changedPlayer.gotchu;
            document.querySelector("#readyButton").className = "readyButton";
            document.querySelector(".titleText").innerHTML = "Ready?"
        }
        allPlayersRef.get().then((snapshot) => {
            let allPlayers = snapshot.val() || {};
            let readyPlayers = 0;
            Object.values(allPlayers).forEach((player) => {
                if (player.ready) {
                    readyPlayers++;
                }
            })
            if (readyPlayers === 2) {
                return window.location.href = `/lobby/${lobbyId}/${playerUnlockedChars[selectedChar]}`;

            }
        })
    })
    allPlayersRef.on("child_removed", (snapshot) => {
        const removedKey = snapshot.val().id;
        document.querySelector("#opponentPet").className = "";
        document.querySelector("#readyButton").className = "notReadyButton";
        document.querySelector(".titleText").innerHTML = "Waiting for second player..."
    })
}


firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
        //LOGGED IN
        playerId = user.uid;
        allPlayersRef = firebase.database().ref(`lobbies/${lobbyId}/ready/players`);
        playerRef = firebase.database().ref(`lobbies/${lobbyId}/ready/players/${playerId}`);
        init()
        allPlayersRef.get().then((snapshot) => {
            let allPlayers = snapshot.val() || {};
            if (Object.keys(allPlayers).length === 2) {
                document.querySelector(".wordleBars").style = "justify-content: center; align-items: center; height: 100%; color: black; display: flex; font-size: 40px;"
                document.querySelector(".wordleBars").innerHTML = "Lobby already has 2 players!"
                throw "Already has 2 players"
            }
        }).then(() => {
            playerRef.set({
                id: playerId,
                gotchu: playerUnlockedChars[selectedChar],
                ready: false
            })

            allPlayersRef.get().then((snapshot) => {
                let allPlayers = snapshot.val() || {};
                playerNum = Object.entries(allPlayers).length
                playerRef.update({
                    num: playerNum
                })
                Object.values(allPlayers).forEach((player) => {
                    console.log(player)
                    if (player.id !== playerId) {
                        document.querySelector("#opponentPet").className = player.gotchu;
                        document.querySelector("#readyButton").className = "readyButton";
                        document.querySelector(".titleText").innerHTML = "Ready?"
                    }
                })
            })
        })
        playerRef.onDisconnect().remove();
    }
})

//Error
firebase.auth().signInAnonymously().catch((error) => {
    console.log(error.code, error.message)
})