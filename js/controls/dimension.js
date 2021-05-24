import { axisReset } from './rotation.js';
import { updateTable } from './table.js';

const dimensionInput = document.getElementById("dimension");
const dimensionButton = document.getElementById("dimensionBtn");
const speedInput = document.getElementById("speed");
let hypercube;

// Sets event listeners for dimension section
export function setDimensionListeners(hc) {
    hypercube = hc;

    // Dimension input
    dimensionInput.addEventListener("input", dimensionDisable);

    // Dimension button
    dimensionButton.addEventListener("click", (e) => {
        let value = dimensionInput.value;
        if(checkValid(value)){
            hypercube.setDimension(Number.parseInt(value));
            axisReset(hypercube);
            updateTable(hypercube);
            speedInput.value = null;
        }
    });
}

// Checks if value is a valid dimension input
function checkValid(value) {
    return !isNaN(value) && value != "" && Number.parseInt(value) > 0;
}

// Handles enabling/disabling of dimension button
function dimensionDisable() {
    let value = dimensionInput.value;
    if(checkValid(value)){
        dimensionInput.disabled = false;
    } else {
        dimensionButton.disabled = true;
    }
}