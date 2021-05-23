import { onResize } from './onResize/onResize.js';
import { Hypercube } from './hypercube.js';
import { draw } from './draw.js';
const hypercube = new Hypercube(3);

window.onload = () => {
    onResize();
    hypercube.setZoom();
    document.getElementById("0,2").addEventListener("click", removeRotation);
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

// Controls
document.getElementById("dimensionBtn").addEventListener("click", (e) => {
    let val = document.getElementById("dimension").value;
    if(!isNaN(val) && val != "" && Number.parseInt(val) > 0){
        val = Number.parseInt(val);
        hypercube.setDimension(val);
        axisReset();
        updateTable();
        document.getElementById("speed").value = null;
    }
});

function dimensionDisable() {
    let val = document.getElementById("dimension").value;
    if(!isNaN(val) && val != "" && Number.parseInt(val) > 0){
        document.getElementById("dimensionBtn").disabled = false;
    } else {
        document.getElementById("dimensionBtn").disabled = true;
    }
}
document.getElementById("dimension").addEventListener("input", dimensionDisable);

function axisReset() {
    document.getElementById("axis1").innerHTML = "<option selected disabled>Axis 1</option>";
    document.getElementById("axis2").innerHTML = "<option selected disabled>Axis 2</option>";
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
    document.getElementById("axis1").innerHTML += html;
    document.getElementById("axis2").innerHTML += html;
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
        inner += "<option ";
        if(i == otherValue){
            inner += "selected ";
        }
        if(i == e.target.value){
            inner += "disabled ";
        }
        inner += "value='" + i + "'>" + i;
        if(i == 1){
            inner += " (x-axis)";
        } else if(i == 2){
            inner += " (y-axis)";
        } else if(i == 3){
            inner += " (z-axis)";
        }
        inner += "</option>";
    }
    document.getElementById("axis" + otherID).innerHTML = inner;
    addDisable();
};
document.getElementById("axis1").addEventListener("change", axisOnChange);
document.getElementById("axis2").addEventListener("change", axisOnChange);

document.getElementById("addBtn").addEventListener("click", (e) => {
    let axis1 = document.getElementById("axis1").value;
    let axis2 = document.getElementById("axis2").value;
    let speed = document.getElementById("speed").value;
    if(isNaN(axis1) || isNaN(axis2) || isNaN(speed) || speed.length == "" ||  axis1 == axis2 || Number.parseInt(axis1) < 1 || Number.parseInt(axis1) > hypercube.dimension || Number.parseInt(axis2) < 1 || Number.parseInt(axis2) > hypercube.dimension){
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
    document.getElementById("speed").value = null;
    document.getElementById("addBtn").disabled = true;
    updateTable();
});

function addDisable() {
    let axis1 = document.getElementById("axis1").value;
    let axis2 = document.getElementById("axis2").value;
    let speed = document.getElementById("speed").value;
    if(isNaN(axis1) || isNaN(axis2) || isNaN(speed) || speed.length == "" ||  axis1 == axis2 || Number.parseInt(axis1) < 1 || Number.parseInt(axis1) > hypercube.dimension || Number.parseInt(axis2) < 1 || Number.parseInt(axis2) > hypercube.dimension){
        document.getElementById("addBtn").disabled = true;
    } else {
        document.getElementById("addBtn").disabled = false;
    }
}
document.getElementById("speed").addEventListener("input", addDisable);

function updateTable() {
    let table = document.getElementById("table")
    table.innerHTML = "<tr><th>Axes</th><th>Speed</th><th></th></tr>";
    for(const rotation of hypercube.rotations){
        table.innerHTML += "<tr><td>" + (rotation[0][0] + 1) + ", " + (rotation[0][1] + 1) + "</td><td>" + rotation[2] + "</td>" + '<td><button id="' + rotation[0][0] + "," + rotation[0][1] + '" class="btn btn-danger rotationButton" style="width: 100%">Remove</button></td></tr>';
    }
    document.querySelectorAll('.rotationButton').forEach(button => {
        button.addEventListener('click', removeRotation);
    })
}

function removeRotation(e) {
    let val = e.target.id.split(",");
    for(let i = 0; i < hypercube.rotations.length; i++){
        if(hypercube.rotations[i][0][0] == val[0] && hypercube.rotations[i][0][1] == val[1]){
            hypercube.rotations.splice(i, 1)
            break;
        }
    }
    updateTable();
}

// Help
let current = 0;
let pages = ['<h2 class="help-title mb-3">Welcome to Hypercube Visualizer!</h2><p class="help-text">A tool to visualize <nobr>n-dimensional</nobr> hypercubes and rotate them in <nobr>n-dimensional</nobr> space.</p><p class="help-text">This short help section will guide you through all the features of the tool, feel free to skip it if you\'ve already seen it before.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Dimension</h2><p class="help-text">Changing the dimension will change which n-dimensional hypercube is being displayed.</p><p class="help-text">Any dimension from 1D upwards is supported, however higher dimensions may lag or crash the browser depending on how powerful your device is.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Rotation</h2><p class="help-text">You can add rotations by specifying the two axes and the speed, in degrees per second, of the rotation. Removing rotations is also possible from the rotations table.</p><p class="help-text">The two axes that are given to a rotation are the axes that change. For example, to rotate a 3D hypercube around the y-axis you would set the axes to the x-axis and the z-axis. This is because the x and z coordinates are the ones which change when rotating around the y-axis.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Enjoy!</h2><p class="help-text">I hope you enjoy playing around with this tool as much as I enjoyed creating it.</p><p class="help-text">If you want to look at the source code, or just have some suggestions, then check out the <a href="https://github.com/BSmith156/Hypercube-Visualizer" target="_blank">GitHub page</a>.</p><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>'];

function resetListeners(){
    if(document.getElementById("helpNext")) {
        document.getElementById("helpNext").addEventListener("click", helpNext);
    }
    if(document.getElementById("helpBack")) {
        document.getElementById("helpBack").addEventListener("click", helpBack);
    }
    if(document.getElementById("helpClose")) {
        document.getElementById("helpClose").addEventListener("click", helpClose);
    }
}
resetListeners();

function helpNext() {
    if(current < pages.length - 1){
        current++;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

function helpBack() {
    if(current > 0){
        current--;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

function helpClose() {
    document.getElementById("help").hidden = true;
    document.getElementById("main").hidden = false;
}