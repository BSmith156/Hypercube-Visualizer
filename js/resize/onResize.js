import { resizeCanvas } from './resizeCanvas.js';
import { resizeControls } from './resizeControls.js';
import { setTransform } from '../hypercube/draw.js';

// Resizes html components and canvas transform
export function onResize() {
    resizeControls();
    resizeCanvas();
    setTransform();
}