const controls = document.getElementById("controls");
const above = document.getElementById("navbar");

export function resizeControls() {
    controls.style.height = (canvas.getBoundingClientRect().bottom) - (above.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(controls).marginTop));
}