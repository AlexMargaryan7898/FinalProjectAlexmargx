
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


function matrixgenerator(size,grs,grseat,alleat,grsspawn,grseatspawn,kamkdz){
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }

    for(let i = 0; i < grs; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            

            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 1;
                success = true;
            }
        }
    }

    for(let i = 0; i < grseat; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            
            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 2;
                success = true;
            }
        }
    }
    for(let i = 0; i < alleat; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            
            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 3;
                success = true;
            }
        }
    }
    for(let i = 0; i < grsspawn; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            
            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 4;
                success = true;
            }
        }
    }
    for(let i = 0; i < grseatspawn; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            
            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 5;
                success = true;
            }
        }
    }
    for(let i = 0; i < kamkdz; i++) {
        let success = false;
        while(!success) {
            let crd1 = Math.floor(Math.random() * size);
            let crd2 = Math.floor(Math.random() * size);
            
            if(matrix[crd1][crd2] == 0) {
                matrix[crd1][crd2]= 6;
                success = true;
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
    return matrix   
}

matrix = matrixgenerator(30, 20, 15, 15, 5, 10, 15);
    
 grassArr = [];
 grassEaterArr=[];
 PredatorArr=[];
 grassSpawnArr = [];
EaterSpawnArr =[];
 KamikadzeArr =[];

     Grass = require("./Grass")
     GrassEater = require("./GrassEater")
     Predator = require("./Predator")
     GrassSpawn = require ("./GrassSpawn")
     EaterSpawn = require("./EaterSpawn")
     Kamikadze = require ("./Kamikadze")


    function createObject(matrix) {
    
    
     for(var y = 0; y < matrix.length; ++y){
         for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y,1);
                 grassArr.push(gr);
             }
                     else if(matrix[y][x] == 8){
     
             }	
             else if(matrix[y][x]==2){
             let grEat = new GrassEater(x,y,2);
                 grassEaterArr.push(grEat);
             }  
             else if(matrix[y][x]==3){
                 let pred = new Predator(x,y,3);
                 PredatorArr.push(pred);
             } 
             else if(matrix[y][x]==4){
                 let spawn = new GrassSpawn(x,y,4);
                 grassSpawnArr.push(spawn);
                } 
                
                
             else if(matrix[y][x]==5){
                 let Eaterspawn = new EaterSpawn(x,y,5);
                 EaterSpawnArr.push(Eaterspawn);
             } 
             else if(matrix[y][x]==6){
                 let Kamik = new Kamikadze(x,y,6);
             KamikadzeArr.push(Kamik);
             } 
         }
      }
        }
       
    


    
    function game() {
        for(var i in grassArr){
            grassArr[i].mul();
        }
        for(var i in grassEaterArr){
            grassEaterArr[i].eat();
        }
        for(var i in PredatorArr){
            PredatorArr[i].eat();
        }
        for(var i in grassSpawnArr){
            grassSpawnArr[i].mul();
        }
        for(var i in EaterSpawnArr){
            EaterSpawnArr[i].mul();
        }
        for(var i in KamikadzeArr){
            KamikadzeArr[i].kaboom(); 
        }
        io.sockets.emit("send matrix", matrix);
    }

 
    setInterval(game, 1000)
    
    function kill() {
        grassArr = [];
        grassEaterArr=[];
        PredatorArr=[];
        grassSpawnArr = [];
       EaterSpawnArr =[];
        KamikadzeArr =[];
       
    
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function addGrass() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function addGrassEater() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
        }
        io.sockets.emit("send matrix", matrix);
    }   
      
    let flag = true

    io.on("connection", function (socket) {
        if (flag) {
            createObject(matrix)
            socket.on("kill", kill);
            socket.on("add grass", addGrass);
            socket.on("add grassEater", addGrassEater);
            flag = false
            console.log(111)
        }
    })
    
    
    var statistics = {};
    
    setInterval(function () {
        statistics.Grass = grassArr.length
        statistics.GrassEater = grassEaterArr.length
        statistics.Predator = PredatorArr.length
        statistics.GrassSpawn = grassSpawnArr.length
        statistics.EaterSpawn = EaterSpawnArr.length
        statistics.Kamikadze = KamikadzeArr.length
        
        fs.writeFileSync("statistics.json",
            JSON.stringify(statistics))
    }, 1000)
    
     weather = "summer"
    
    setInterval(function () {
    
        if (weather == "summer") {
            weather = "autumn"
        }
        else if (weather == "autumn") {
            weather = "winter"
        }
        else if (weather == "winter") {
            weather = "spring"
        }
        else if (weather == "spring") {
            weather = "summer"
        }
        io.sockets.emit("send weather", weather)
    },4000)
    
