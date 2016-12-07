//
//  Make directions Usable
//

const fs = require('fs');

let directions = fs.readFileSync('./directions.txt').toString().split(", ");

directions[directions.length - 1 ] = directions[directions.length - 1].slice(0, -1)

var steps = directions.map((unit) => {
    const direction = [unit[0], unit.slice(1)];
    return direction;
});

//
// initialize data stores
//

let currentDirection = "N";
//north-south
let latitude = 0;
//east-west
let longitude = 0;


// Logic for determining next direction

// @current = N, S, E, or W
// @turnDir
function followDirections(step) {
    var turnDir = step[0];
    var blocks = parseInt(step[1]);

    if (turnDir === "R") {
        switch (currentDirection) {
            case "N":
                currentDirection = "E";
                longitude += blocks;
                break;
            case "S":
                currentDirection = "W";
                longitude -= blocks;
                break;
            case "E":
                currentDirection = "S";
                latitude -= blocks;
                break;
            case "W":
                currentDirection = "N";
                latitude += blocks;
                break;
        }
    } else {
        switch (currentDirection) {
            case "N":
                currentDirection = "W";
                longitude -= blocks;
                break;
            case "S":
                currentDirection = "E";
                longitude += blocks;
                break;
            case "E":
                currentDirection = "N";
                latitude += blocks;
                break;
            case "W":
                currentDirection = "S";
                latitude -= blocks;
                break;
        }
    }
}

steps.map(followDirections);

console.log(Math.abs(latitude) + Math.abs(longitude));