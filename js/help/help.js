let pages = ['<h2 class="help-title mb-3">Welcome to Hypercube Visualizer!</h2><p class="help-text">A tool to visualize <nobr>n-dimensional</nobr> hypercubes and rotate them in <nobr>n-dimensional</nobr> space.</p><p class="help-text">This short help section will guide you through all the features of the tool, feel free to skip it if you\'ve already seen it before.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Dimension</h2><p class="help-text">Changing the dimension will change which n-dimensional hypercube is being displayed.</p><p class="help-text">Any dimension from 1D upwards is supported, however higher dimensions may lag or crash the browser depending on how powerful your device is.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Rotation</h2><p class="help-text">You can add rotations by specifying the two axes and the speed, in degrees per second, of the rotation. Removing rotations is also possible from the rotations table.</p><p class="help-text">The two axes that are given to a rotation are the axes that change. For example, to rotate a 3D hypercube around the y-axis you would set the axes to the x-axis and the z-axis. This is because the x and z coordinates are the ones which change when rotating around the y-axis.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Enjoy!</h2><p class="help-text">I hope you enjoy playing around with this tool as much as I enjoyed creating it.</p><p class="help-text">If you want to look at the source code, or just have some suggestions, then check out the <a href="https://github.com/BSmith156/Hypercube-Visualizer" target="_blank">GitHub page</a>.</p><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>'];
let current = -1;

// Display next help page
export function helpNext() {
    if(current < pages.length - 1){
        current++;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Display previous help page
function helpBack() {
    if(current > 0){
        current--;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Close help
function helpClose() {
    document.getElementById("help").hidden = true;
    document.getElementById("main").hidden = false;
}

// Reset button listeners
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