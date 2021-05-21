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

document.getElementById("dimensionBtn").addEventListener("click", (e) => {
    let val = document.getElementById("dimension").value;
    if(val != "" && val > 0){
        hypercube.setDimension(val);
        axisReset();
    }
});

function axisReset() {
    document.getElementById("axis1").innerHTML = "<option selected disabled>Axis 1</option>";
    document.getElementById("axis2").innerHTML = "<option selected disabled>Axis 2</option>";
    for(let i = 1; i <= hypercube.dimension; i++){
        document.getElementById("axis1").innerHTML += "<option value='" + i + "'>" + i + "</option>";
        document.getElementById("axis2").innerHTML += "<option value='" + i + "'>" + i + "</option>";
    }
}

function axisOnChange(e) {
    let otherID = (e.target.id == "axis1") ? "2" : "1";
    let otherValue = document.getElementById("axis" + otherID).value;
    let inner = "<option ";
    if(isNaN(otherValue)){
        inner += "selected ";
    }
    inner += "disabled>Axis " + otherID + "</option>";
    for(let i = 1; i <= hypercube.dimension; i++){
        if(i != e.target.value){
            inner += "<option ";
            if(i == otherValue){
                inner += "selected ";
            }
            inner += "value='" + i + "'>" + i + "</option>"
        }
    }
    document.getElementById("axis" + otherID).innerHTML = inner;
};
document.getElementById("axis1").addEventListener("change", axisOnChange);
document.getElementById("axis2").addEventListener("change", axisOnChange);

document.getElementById("addBtn").addEventListener("click", (e) => {
    let axis1 = document.getElementById("axis1").value;
    let axis2 = document.getElementById("axis2").value;
    let speed = document.getElementById("speed").value;
    if(isNaN(axis1) || isNaN(axis2) || isNaN(speed) || axis1 == axis2 || axis1 < 1 || axis1 > hypercube.dimension || axis2 < 1 || axis2 > hypercube.dimension){
        return;
    }
    hypercube.rotations.push([[axis1 - 1, axis2 - 1], (speed / 30) * (Math.PI / 180)]);
    axisReset();
    document.getElementById("speed").value = null;
});

document.getElementById("undoBtn").addEventListener("click", (e) => {
    hypercube.rotations.pop();
});

document.getElementById("clearBtn").addEventListener("click", (e) => {
    hypercube.rotations = [];
});