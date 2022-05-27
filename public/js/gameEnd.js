(function () {
  let lobbyId = window.location.pathname.split("/")[2];

  window.onclick = function (event) {
    const targetClassList = event.target.className;

    if (targetClassList.includes("rematchButton")) {
      return window.location.href = `/lobby/${lobbyId}`;
    }

    if (targetClassList.includes("quitButton")) {
      return window.location.href = `/user`;
    }
  }
})();