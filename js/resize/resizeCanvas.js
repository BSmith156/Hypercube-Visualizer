const nav = document.getElementById("navbar");
const canvas = document.getElementById("canvas");
const controls = document.getElementById("controls");

// Resizes canvas
export function resizeCanvas() {
    let rect = canvas.getBoundingClientRect();
    canvas.height = (rect.bottom) - (nav.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(canvas).marginTop));
    canvas.width = (rect.right) - (controls.getBoundingClientRect().right + parseInt(window.getComputedStyle(controls).marginRight))
}