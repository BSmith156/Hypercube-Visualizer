import { deepcopy } from './deepcopy.js';

export function project(original) {
    let points = deepcopy(original);

    // 1D case
    if(points.length == 2){
        points[0].push(0);
        points[1].push(0);
    }

    // Project points into 2D space
    while(points[0].length != 2){
        for(const point of points){
            let scale = 1 / (2 - point.pop());
            for(let i = 0; i < point.length; i++){
                point[i] *= scale;
            }

        }
    }
    return points;
}