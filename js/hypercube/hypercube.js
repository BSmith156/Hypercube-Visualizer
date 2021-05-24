import { deepcopy } from '../helpers/deepcopy.js';
import { project } from './project.js';

// Create hypercube
export function Hypercube(dimension) {
    this.setDimension(dimension);
}

// Set dimension of hypercube
Hypercube.prototype.setDimension = function(dimension) {
    this.dimension = dimension;
    this.setZoom();

    // Create vertices
    this.points = [[-0.5], [0.5]];
    for(let i = 1; i < dimension; i++){
        this.points = this.points.concat(deepcopy(this.points));
        for(let j = 0; j < this.points.length; j++){
            if(j < this.points.length / 2){
                this.points[j].push(-0.5);
            } else {
                this.points[j].push(0.5);
            }
        }
    }

    // Create edges
    this.edges = [];
    for(let i = 0; i < this.points.length; i++){
        for(let j = i + 1; j < this.points.length; j++){
            let diff = false;
            for(let k = 0; k < dimension; k++){
                if(this.points[i][k] != this.points[j][k]){
                    if(diff){
                        diff = false;
                        break;
                    }
                    diff = true;
                }
            }
            if(diff){
                this.edges.push([i, j]);
            }
        }
    }

    // Add default rotation
    this.rotations = [];
    if(this.dimension > 2){
        this.rotations.push([[0, 2], (25 / 30) * (Math.PI / 180), 25]);
    }
}

// Rotate hypercube
Hypercube.prototype.rotate = function() {
    for(const rotation of this.rotations){
        for(const point of this.points){
            let temp = (point[rotation[0][0]] * Math.cos(rotation[1])) + (point[rotation[0][1]] * Math.sin(rotation[1]));
            point[rotation[0][1]] = (point[rotation[0][0]] * -Math.sin(rotation[1])) + (point[rotation[0][1]] * Math.cos(rotation[1]));
            point[rotation[0][0]] = temp;
        }
    }
}

// Set hypercube zoom
Hypercube.prototype.setZoom = function() {
    let canvas = document.getElementById("canvas");
    let smaller = (canvas.width < canvas.height) ? canvas.width : canvas.height;
    let point = 0.5;
    for(let i = 2; i < this.dimension; i++){
        point *= 1 / (2 - point);
    }
    this.zoom = (smaller / 3) / point;
}