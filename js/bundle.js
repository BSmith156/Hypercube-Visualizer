import { axisReset, setRotationListeners } from './controls/rotation.js';
import { draw } from './hypercube/draw.js';
import { helpNext } from './help/help.js';
import { Hypercube } from './hypercube/hypercube.js';
import { onResize } from './resize/onResize.js';
import { updateTable } from './controls/table.js';
import { setDimensionListeners } from './controls/dimension.js';

const hypercube = new Hypercube(3);

window.onload = () => {
    onResize();
    hypercube.setZoom();

    helpNext()
    setDimensionListeners(hypercube);
    setRotationListeners(hypercube);
    axisReset();
    updateTable(hypercube);
    
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