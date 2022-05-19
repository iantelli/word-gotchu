(function () {
    let menuMusic = new Audio('/sounds/menuMusic.wav');
    let uiSound = new Audio('/sounds/UI_Sound.wav');
    let backSound = new Audio('/sounds/Remove_Letter.wav');
    menuMusic.volume = 0.1;
    menuMusic.loop = true;
    uiSound.load();
    uiSound.volume = 0.18;
    backSound.load();
    backSound.volume = 0.15;
    function createRoom() {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let roomCode = "";
        for (let i = 0; i < 6; i++) {
            roomCode += characters[Math.floor(Math.random() * characters.length)];
        }
        return roomCode;
    }
    document.addEventListener("click", event => {

        event.preventDefault();
        if (event.target.classList.contains("createRoom")) {
            let roomCode = createRoom();
            let newRoomCode = document.createElement("span");
            let btn = document.createElement("div");
            let roomCodeText = document.createElement("p");
            uiSound.play();
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.battleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("createRoomBackBtn");
            document.querySelector("div.backButton").classList.toggle("battleMenuBackBtn");
            btn.classList.add("copyBtn");
            roomCodeText.classList.add("roomCodeText");
            newRoomCode.innerHTML += "Room Code: " + roomCode;
            btn.innerHTML = "Copy";
            btn.addEventListener("click", event => {
                event.preventDefault();
                uiSound.play();
                navigator.clipboard.writeText(roomCode);
                btn.innerHTML = "Copied!";
            });
            roomCodeText.innerText = "Share this code to your friend!";
            document.querySelector("div.createRoomDiv").appendChild(newRoomCode);
            document.querySelector("div.battleMenu").appendChild(btn);
            document.querySelector("div.battleMenu").appendChild(roomCodeText);
            return;
        }

        if (event.target.classList.contains("joinRoom")) {
            let roomCodeInput = document.createElement("input");
            let joinRoomButton = document.createElement("button");
            uiSound.play();
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.joinBattleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("joinRoomBackBtn");
            document.querySelector("div.backButton").classList.toggle("battleMenuBackBtn");
            roomCodeInput.classList.add("roomCodeInput");
            joinRoomButton.classList.add("joinRoomButton");
            roomCodeInput.type = "text";
            roomCodeInput.placeholder = "Enter Room Code";
            document.querySelector("div.joinRoomDiv").appendChild(roomCodeInput);
            document.querySelector("div.joinRoomDiv").appendChild(joinRoomButton);
            joinRoomButton.innerHTML = "Join Room";
            joinRoomButton.type = "button";
            joinRoomButton.addEventListener("click", event => {
                event.preventDefault();
                let roomCode = roomCodeInput.value;
                uiSound.play();
                location.href = "/lobby/" + roomCode;
            });
            return;
        }

        if (event.target.classList.contains("backButton") && event.target.classList.contains("createRoomBackBtn")) {
            backSound.play();
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.battleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("createRoomBackBtn");
            document.querySelector("div.createRoomDiv").innerHTML = "";
            document.querySelector("div.copyBtn").remove();
            document.querySelector("p.roomCodeText").remove();
            document.querySelector("div.backButton").classList.toggle("battleMenuBackBtn");
            return;
        } 
        if (event.target.classList.contains("backButton") && event.target.classList.contains("joinRoomBackBtn")) {
            backSound.play();
            document.querySelector("div.backButton").classList.toggle("joinRoomBackBtn");
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.joinBattleMenu").classList.toggle("hidden");
            document.querySelector("div.joinRoomDiv").innerHTML = "";
            document.querySelector("div.backButton").classList.toggle("battleMenuBackBtn");
            return;
        }
        if (event.target.classList.contains("backButton") && event.target.classList.contains("battleMenuBackBtn")) {
            backSound.play();
            document.querySelector(".gochuDome").classList.toggle("hidden");
            document.querySelector(".mainScreenBg").classList.toggle("hidden");
            return;
        }


        // Gacha page stuff

        if (event.target.classList.contains("gachaButton")) {
            uiSound.play();
            document.querySelector(".mainScreenBg").classList.toggle("hidden");
            document.querySelector(".gachaBg").classList.toggle("hidden");
            return;
        }
        if (event.target.classList.contains("homeButton")) {
            backSound.play();
            document.querySelector(".gachaBg").classList.toggle("hidden");
            document.querySelector(".mainScreenBg").classList.toggle("hidden");
            return;
        }
    });
}

)();

