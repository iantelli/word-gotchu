// Page Rescaling
function reScaleWhatever(backgroundElement) {
    const scaleWidth = window.innerWidth / 1440
    const scaleHeight = window.innerHeight / 1024
    backgroundElement.style.transform = `translateX(-50%) translateY(-50%) scale(${scaleWidth, scaleHeight})`
}

window.addEventListener("resize", event => {
    reScaleWhatever()
})