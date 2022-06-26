 
var socket = io();
const FPS = 30;
   side = 20;

   grassArr = [];
   grassEaterArr=[];
   PredatorArr=[];
   grassSpawnArr = [];
   EaterSpawnArr =[];
   KamikadzeArr =[];
 
function setup() {
    frameRate(5)
    createCanvas(30 * side, 30* side);
    background('#acacac');
 }

 weather = "summer"

 socket.on("send weather", function (data) {
     weather = data
 })
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if (weather == "summer") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if (weather == "autumn") {
                    fill("#a37c0f");
                    rect(x * side, y * side, side, side);
                }
                else if (weather == "winter") {
                    fill("#f2f0eb");
                    rect(x * side, y * side, side, side);
                }
                else if (weather == "spring") {
                    fill("#36a816");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#32CD32");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#CCCC00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("Black");
                rect(x * side, y * side, side, side);
            }
 
          

        }
    }  


}


socket.on("send matrix", nkarel)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}


setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)

