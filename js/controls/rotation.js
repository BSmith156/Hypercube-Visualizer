import { updateTable } from './table.js';

const axis1Dropdown = document.getElementById("axis1");
const axis2Dropdown = document.getElementById("axis2");
const speedInput = document.getElementById("speed");
const addButton = document.getElementById("addBtn");
let hypercube;

// Resets axes dropdown
export function axisReset() {
    axis1Dropdown.innerHTML = "<option selected disabled>Axis 1</option>";
    axis2Dropdown.innerHTML = "<option selected disabled>Axis 2</option>";

    let html = "";
    for(let i = 1; i <= hypercube.dimension; i++){
        html += "<option value='" + i + "'>" + i;
        if(i == 1){
            html += " (x-axis)";
        } else if(i == 2){
            html += " (y-axis)";
        } else if(i == 3){
            html += " (z-axis)";
        }
        html += "</option>";
    }

    axis1Dropdown.innerHTML += html;
    axis2Dropdown.innerHTML += html;
}

// Sets event listeners for rotation section
export function setRotationListeners(hc) {
    hypercube = hc;

    // Axes dropdown
    axis1Dropdown.addEventListener("change", axisOnChange);
    axis2Dropdown.addEventListener("change", axisOnChange);

    // Speed input
    speedInput.addEventListener("input", addDisable);

    // Add button
    addButton.addEventListener("click", addRotation);
}

// Handles enabling/disabling of add button
function addDisable() {
    let axis1 = axis1Dropdown.value;
    let axis2 = axis2Dropdown.value;
    let speed = speedInput.value;
    addButton.disabled = !checkValid(axis1, axis2, speed);
}

// Disables chosen axis on other axis dropdown
function axisOnChange(e) {
    let id = (e.target.id == "axis1") ? "2" : "1";
    let value = document.getElementById("axis" + id).value;
    let html = "<option ";

    if(isNaN(value)){
        html += "selected ";
    }

    html += "disabled>Axis " + id + "</option>";
    for(let i = 1; i <= hypercube.dimension; i++){
        html += "<option ";
        if(i == value){
            html += "selected ";
        }
        if(i == e.target.value){
            html += "disabled ";
        }
        html += "value='" + i + "'>" + i;
        if(i == 1){
            html += " (x-axis)";
        } else if(i == 2){
            html += " (y-axis)";
        } else if(i == 3){
            html += " (z-axis)";
        }
        html += "</option>";
    }

    document.getElementById("axis" + id).innerHTML = html;
    addDisable();
};

// Adds rotation
function addRotation() {
    let axis1 = axis1Dropdown.value;
    let axis2 = axis2Dropdown.value;
    let speed = speedInput.value;

    if(!checkValid(axis1, axis2, speed)){
        return;
    }

    speed = Number.parseInt(speed);
    let found = false;
    for(const rotation of hypercube.rotations){
        if(rotation[0][0] == axis1 - 1 && rotation[0][1] == axis2 - 1){
            found = true;
            rotation[1] += (speed / 30) * (Math.PI / 180);
            rotation[2] += speed;
            break;
        }
    }
    if(!found){
        hypercube.rotations.push([[axis1 - 1, axis2 - 1], (speed / 30) * (Math.PI / 180), speed]);
    }

    axisReset();
    speedInput.value = null;
    addButton.disabled = true;
    updateTable(hypercube);
}

// Check if values are valid rotation inputs
function checkValid(axis1, axis2, speed) {
    if(isNaN(axis1) || isNaN(axis2) || isNaN(speed)){
        return false;
    } else {
        axis1 = Number.parseInt(axis1);
        axis2 = Number.parseInt(axis2);
        return !(speed.length == 0 ||  axis1 == axis2 || axis1 < 1 || axis1 > hypercube.dimension || axis2 < 1 || axis2 > hypercube.dimension);
    }
}