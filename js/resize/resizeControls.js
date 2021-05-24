const nav = document.getElementById("navbar");
const controls = document.getElementById("controls");

// Resizes controls div
export function resizeControls() {
    controls.style.height = (canvas.getBoundingClientRect().bottom) - (nav.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(controls).marginTop));
}