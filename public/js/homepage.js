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
        document.querySelector("p.createRoom").classList.toggle("hidden");
        document.querySelector("p.joinRoom").classList.toggle("hidden");
        document.querySelector("button.backButton").classList.toggle("hidden");
        let startButton = document.createElement("button");
        startButton.classList.add("startButton");
        newRoomCode.innerHTML += "Room Code: " + roomCode;
        document.querySelector("div.newRoom").appendChild(newRoomCode);
        document.querySelector("div.newRoom").appendChild(startButton);
        startButton.setAttribute('onclick', "location.href='/lobby/" + roomCode + "'");
        startButton.innerHTML = "Start Game";
        startButton.type = "button";
    }

    if (event.target.classList.contains("joinRoom")) {
        let roomCodeInput = document.createElement("input");
        let joinRoomButton = document.createElement("button");
        document.querySelector("p.createRoom").classList.toggle("hidden");
        document.querySelector("p.joinRoom").classList.toggle("hidden");
        document.querySelector("button.backButton").classList.toggle("hidden");
        roomCodeInput.classList.add("roomCodeInput");
        joinRoomButton.classList.add("joinRoomButton");
        roomCodeInput.type = "text";
        roomCodeInput.placeholder = "Enter Room Code";
        document.querySelector("div.newRoom").appendChild(roomCodeInput);
        document.querySelector("div.newRoom").appendChild(joinRoomButton);
        joinRoomButton.innerHTML = "Join Room";
        joinRoomButton.type = "button";
        joinRoomButton.addEventListener("click", event => {
            event.preventDefault();
            let roomCode = roomCodeInput.value;
            location.href = "/lobby/" + roomCode;
        });
    }

    if (event.target.classList.contains("backButton")) {
      document.querySelector("p.createRoom").classList.toggle("hidden");
      document.querySelector("p.joinRoom").classList.toggle("hidden");
      document.querySelector("button.backButton").classList.toggle("hidden");
      document.querySelector("div.newRoom").innerHTML = "";
    }
});