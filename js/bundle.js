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

// Controls
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

// Help
let current = 0;
let pages = ['<h2 class="help-title mb-3">Welcome to Hypercube Visualizer!</h2><p class="help-text">A tool to visualize <nobr>n-dimensional</nobr> hypercubes and rotate them in <nobr>n-dimensional</nobr> space.</p><p class="help-text">This short help section will guide you through all the features of the tool, feel free to skip it if you\'ve already seen it before.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Dimension</h2><p class="help-text">Changing the dimension will change which n-dimensional hypercube is being displayed.</p><p class="help-text">Any dimension from 1D upwards is supported, however higher dimensions may lag or crash the browser depending on how powerful your device is.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Rotation</h2><p class="help-text">You can add rotations by specifying the two axes and the speed, in degrees per second, of the rotation. Undoing and clearing rotations is also possible.</p><p class="help-text">The two axes that are given to a rotation are the axes that change. For example, to rotate a 3D hypercube around the y-axis you would set the axes to the x-axis and the z-axis. This is because the x and z coordinates are the ones which change when rotating around the y-axis.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
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