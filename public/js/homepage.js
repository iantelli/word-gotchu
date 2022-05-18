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
            document.querySelector("div.backButton").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.add("createRoomBackBtn");
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
        }

        if (event.target.classList.contains("joinRoom")) {
            let roomCodeInput = document.createElement("input");
            let joinRoomButton = document.createElement("button");
            uiSound.play();
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.joinBattleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.add("joinRoomBackBtn");
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
        }

        if (event.target.classList.contains("backButton") && event.target.classList.contains("createRoomBackBtn")) {
            backSound.play();
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.battleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.remove("createRoomBackBtn");
            document.querySelector("div.createRoomDiv").innerHTML = "";
            document.querySelector("div.copyBtn").remove();
            document.querySelector("p.roomCodeText").remove();
        }

        if (event.target.classList.contains("backButton") && event.target.classList.contains("joinRoomBackBtn")) {
            backSound.play();
            document.querySelector("div.backButton").classList.remove("joinRoomBackBtn");
            document.querySelector("div.wordleBar2").classList.toggle("hidden");
            document.querySelector("div.joinBattleMenu").classList.toggle("hidden");
            document.querySelector("div.backButton").classList.toggle("hidden");
            document.querySelector("div.joinRoomDiv").innerHTML = "";
        }
    });
})();