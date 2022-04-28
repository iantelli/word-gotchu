
if (document.addEventListener) {
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
                element.className = 'key one green-background'
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
                element.className = 'key one background'
                console.log(element.className)
            });
        }

    })
};

