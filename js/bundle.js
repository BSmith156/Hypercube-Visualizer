import { onResize } from './onResize/onResize.js';
import { Hypercube } from './hypercube.js';
import { draw } from './draw.js';
const fps = 30;

window.onload = () => {
    onResize();
    let hypercube = new Hypercube(3, []);
    setInterval(() => {
        draw(hypercube);
    }, 1000 / fps);
    window.onresize = () => {
        onResize();
        hypercube.setZoom();
        draw(hypercube);
    }

};