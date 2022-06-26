module.exports = class Kamikadze {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character1,character2,character3) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1||matrix[y][x] == character2||matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
    }
    allCells() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[y][x]) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    kaboom() {
        this.multiply++;
        var neighbours = this.allCells();
        console.log("Number of neighbours",neighbours.length);
        
        if(neighbours.length < 8){
            return;
        }

        for (let n of neighbours) {
            var newX = n[0];
            var newY = n[1];
            matrix[newY][newX] = 0;
        }

        matrix[this.y][this.x] = 0;
    }
}