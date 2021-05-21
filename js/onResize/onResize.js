import { resizeCanvas } from './resizeCanvas.js';
import { resizeControls } from './resizeControls.js';
import { setTransform } from '../draw.js';

export function onResize() {
    resizeControls();
    resizeCanvas();
    setTransform();
}