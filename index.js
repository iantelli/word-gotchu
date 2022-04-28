
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("letter")) {
        event.preventDefault()
        console.log(event.target.innerHTML)
        document.querySelector(".output").innerHTML += event.target.innerText
    } else if (event.target.classList.contains('del')) {
        document.querySelector(".output").innerHTML = document.querySelector(".output").innerHTML.slice(0, -1)

    }
    if (event.target.classList.contains('green')) {
        document.querySelectorAll('.one').forEach(element => {
            element.className = 'key one green'
            console.log(element.className)

        });

    } else if (event.target.classList.contains('yellow')) {
        document.querySelectorAll('.one').forEach(element => {
            element.className = 'key one yellow'
            console.log(element.className)
        });
    } else if (event.target.classList.contains('black')) {
        document.querySelectorAll('.one').forEach(element => {
            element.className = 'key one black'
            console.log(element.className)
        });
    } else if (event.target.classList.contains('default')) {
        document.querySelectorAll('.one').forEach(element => {
            element.className = 'key one'
            console.log(element.className)
        });
    }

})




// Change keys on press

const allKeys = [..."abcdefghijklmnopqrstuvwxyz", "enter", "backspace"]

document.addEventListener("keydown", function (event) {
    const keyPressed = event.key.toLowerCase();
    if (allKeys.includes(event.key.toLowerCase())) {
        console.log(event.key.toLowerCase())
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
    }
})