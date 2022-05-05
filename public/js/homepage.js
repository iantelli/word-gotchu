(function () { 
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
        document.querySelector("div.wordle_bar2").classList.toggle("hidden");
        document.querySelector("div.battle_menu").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.add("createRoomBackBtn");
        btn.classList.add("copy_btn");
        newRoomCode.innerHTML += "Room Code: " + roomCode;
        btn.innerHTML = "Copy";
        btn.addEventListener("click", event => {
            event.preventDefault();
            navigator.clipboard.writeText(roomCode);
            btn.innerHTML = "Copied!";
        });
        roomCodeText.innerText = "Share this code to your friend!";
        document.querySelector("div.createRoomDiv").appendChild(newRoomCode);
        document.querySelector("div.battle_menu").appendChild(btn);
        document.querySelector("div.battle_menu").appendChild(roomCodeText);
    }

    if (event.target.classList.contains("joinRoom")) {
        let roomCodeInput = document.createElement("input");
        let joinRoomButton = document.createElement("button");
        document.querySelector("div.wordle_bar2").classList.toggle("hidden");
        document.querySelector("div.join_battle_menu").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.add("joinRoomBackBtn");
        roomCodeInput.classList.add("roomCodeInput");
        joinRoomButton.classList.add("joinRoomButton");
        roomCodeInput.type = "text";
        roomCodeInput.placeholder = "Enter Room Code";
        document.querySelector("div.joinRoom").appendChild(roomCodeInput);
        document.querySelector("div.joinRoom").appendChild(joinRoomButton);
        joinRoomButton.innerHTML = "Join Room";
        joinRoomButton.type = "button";
        joinRoomButton.addEventListener("click", event => {
            event.preventDefault();
            let roomCode = roomCodeInput.value;
            location.href = "/lobby/" + roomCode;
        });
    }

    if (event.target.classList.contains("backButton") && event.target.classList.contains("createRoomBackBtn")) {
        document.querySelector("div.wordle_bar2").classList.toggle("hidden");
        document.querySelector("div.battle_menu").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.remove("createRoomBackBtn");
        document.querySelector("div.createRoomDiv").innerHTML = "";
    }

    if (event.target.classList.contains("backButton") && event.target.classList.contains("joinRoomBackBtn")) {
        document.querySelector("div.backButton").classList.remove("joinRoomBackBtn");
        document.querySelector("div.wordle_bar2").classList.toggle("hidden");
        document.querySelector("div.join_battle_menu").classList.toggle("hidden");
        document.querySelector("div.backButton").classList.toggle("hidden");
        document.querySelector("div.joinRoom").innerHTML = "";
    }
});
})();