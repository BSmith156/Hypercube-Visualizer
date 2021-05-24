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
            value = Number.parseInt(value);
            if(value <= 10 || confirm("Dimensions above 10 may lag or crash the browser! Are you sure?")){
                hypercube.setDimension(Number.parseInt(value));
                axisReset(hypercube);
                updateTable(hypercube);
                speedInput.value = null;
            } else {
                dimensionInput.value = hypercube.dimension;
            }
        } else {
            dimensionInput.value = hypercube.dimension;
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
    console.log(value);
    if(checkValid(value)){
        dimensionButton.disabled = false;
    } else {
        dimensionButton.disabled = true;
    }
}