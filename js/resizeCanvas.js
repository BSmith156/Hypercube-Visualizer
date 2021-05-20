export function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    const above = document.getElementById("controls");
    canvas.height = (canvas.getBoundingClientRect().bottom) - (above.getBoundingClientRect().bottom + parseInt(window.getComputedStyle(above).marginBottom));
    canvas.width = window.innerWidth - parseInt(window.getComputedStyle(canvas).marginLeft) - parseInt(window.getComputedStyle(canvas).marginRight);
}