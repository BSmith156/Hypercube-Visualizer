import { onResize } from './onResize/onResize.js';
import { Hypercube } from './hypercube.js';
import { draw } from './draw.js';
const hypercube = new Hypercube(3);

window.onload = () => {
    onResize();
    hypercube.setZoom();
    setInterval(() => {
        hypercube.rotate();
        draw(hypercube);
    }, 1000 / 30); 
};

window.onresize = () => {
    onResize();
    hypercube.setZoom();
    draw(hypercube);
}

document.getElementById("dimension").addEventListener("input", (e) => {
    let val = e.target.value;
    if(val != "" && val > 0){
        hypercube.setDimension(val);
    }
});