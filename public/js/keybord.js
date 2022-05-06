(function () {
  document.querySelector(".keyboard").addEventListener("click", event => {
    event.preventDefault();
    if (event.target.classList.contains("letter")) {
      document.querySelector("input.submitWord").value += event.target.innerHTML;
    }
    else if (event.target.classList.contains("del")) {
      document.querySelector("input.submitWord").value = document.querySelector("input.submitWord").value.slice(0, -1);
    }
    else if (event.target.classList.contains("ent")) {
      document.querySelector("button.submitWordle").click();
    }
  })

  // Change keys on press

  const allKeys = [..."abcdefghijklmnopqrstuvwxyz", "enter", "backspace"]

  document.addEventListener("keydown", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (allKeys.includes(event.key.toLowerCase())) {
      const key = document.querySelector("#" + keyPressed);
      key.classList.add("pressed");
      key.children[0].classList.add("pressed")
    }
  })

  document.addEventListener("keyup", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (allKeys.includes(event.key.toLowerCase())) {
      const key = document.querySelector("#" + keyPressed);
      key.classList.remove("pressed");
      key.children[0].classList.remove("pressed")
    }
  })
})();