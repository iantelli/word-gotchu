const lockedIcons = document.querySelectorAll(".locked");

lockedIcons.forEach(icon => {
    const cords = {
        x: icon.getBoundingClientRect().x,
        y: icon.getBoundingClientRect().y
    };
    const bottomBar = document.querySelector(".bottomBar");
    const lockIcon = document.createElement("div");
    lockIcon.classList.add("lockedIcon");
    lockIcon.style.left = `${cords.x}px`;
    lockIcon.style.top = `${cords.y}px`;
    bottomBar.appendChild(lockIcon);
})