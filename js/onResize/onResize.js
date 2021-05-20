import { resizeCanvas } from './resizeCanvas.js';
import { resizeControls } from './resizeControls.js';

export function onResize() {
    resizeControls();
    resizeCanvas();
}