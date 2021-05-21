const canvas = document.getElementById("canvas");
const above = document.getElementById("navbar");
const left = document.getElementById("controls");

export function resizeCanvas() {
    canvas.height = (canvas.getBoundingClientRect().bottom) - (above.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(canvas).marginTop));
    canvas.width = (canvas.getBoundingClientRect().right) - (left.getBoundingClientRect().right + parseInt(window.getComputedStyle(left).marginRight))
}