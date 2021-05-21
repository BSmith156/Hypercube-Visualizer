const project = require("./project.js");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#FFFFFF";

export function draw(hypercube) {
    points = project(hypercube.points);
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.beginPath();
    for(const edge in hypercube.edges){
        ctx.moveTo(points[edge[0]][0], points[edge[0]][1]);
        ctx.lineTo(points[edge[1]][0], points[edge[1]][1]);
    }
    ctx.stroke();
}

export function setTransform(zoom) {
    ctx.setTransform(zoom, 0, 0, zoom, canvas.width / 2, canvas.height / 2);
}