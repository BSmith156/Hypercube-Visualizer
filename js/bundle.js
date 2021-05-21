import { onResize } from './onResize/onResize.js';
import { Hypercube } from './hypercube.js';
import { draw } from './draw.js';

window.onload = () => {
    onResize();
    let hypercube = new Hypercube(3, []);
    draw(hypercube);
    window.onresize = () => {
        onResize();
        hypercube.setZoom();
        draw(hypercube);
    }

};