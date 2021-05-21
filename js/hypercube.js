export function Hypercube(dimension, rotations) {
    this.setDimension(dimension);
    this.rotations = rotations;
}

Hypercube.prototype.setDimension = function(dimension) {
    this.dimension = dimension;

    // Create vertices
    this.points = [[-0.5], [0.5]];
    for(let i = 1; i < dimension; i++){
        this.points = this.points.concat(this.points);
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
}