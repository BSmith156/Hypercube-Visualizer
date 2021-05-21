import { project } from './project.js';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function draw(hypercube) {
    const points = project(hypercube.points);
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.beginPath();
    for(const edge of hypercube.edges){
        ctx.moveTo(points[edge[0]][0] * hypercube.zoom, points[edge[0]][1] * hypercube.zoom);
        ctx.lineTo(points[edge[1]][0] * hypercube.zoom, points[edge[1]][1] * hypercube.zoom);
    }
    ctx.stroke();
}

export function setTransform() {
    ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
}