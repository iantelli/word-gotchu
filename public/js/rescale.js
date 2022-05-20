// Page Rescaling
const backgroundElement = document.querySelector(".background")
function reScaleWhatever() {
    const scaleWidth = window.innerWidth / 1440
    const scaleHeight = window.innerHeight / 1024
    backgroundElement.style.transform = `translateX(-50%) translateY(-50%) scale(${scaleWidth, scaleHeight})`
}

window.addEventListener("resize", event => {
    reScaleWhatever()
})

reScaleWhatever()
