const table = document.getElementById("table");
let hypercube;

// Updates rotation table
export function updateTable(hc) {
    hypercube = hc;
    table.innerHTML = "<tr><th>Axes</th><th>Speed</th><th></th></tr>";
    for(const rotation of hypercube.rotations){
        table.innerHTML += "<tr><td>" + (rotation[0][0] + 1) + ", " + (rotation[0][1] + 1) + "</td><td>" + rotation[2] + "</td>" + '<td><button id="' + rotation[0][0] + "," + rotation[0][1] + '" class="btn btn-danger removeButton" style="width: 100%">Remove</button></td></tr>';
    }

    // Add event listener to each remove button
    document.querySelectorAll('.removeButton').forEach(button => {
        button.addEventListener('click', removeRotation);
    })
}

// Remove rotation with axes indicated by caller id
function removeRotation(e) {
    let axes = e.target.id.split(",");
    for(let i = 0; i < hypercube.rotations.length; i++){
        if(hypercube.rotations[i][0][0] == axes[0] && hypercube.rotations[i][0][1] == axes[1]){
            hypercube.rotations.splice(i, 1)
            break;
        }
    }
    updateTable(hypercube);
}