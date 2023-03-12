var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let tile = document.createElement("div");
            tile.id = row.toString() + "-" + column.toString();

            let num = board[row][column];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    generateRandomTile();
    generateRandomTile();
}

function hasEmptyTile() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (board[row][column] == 0) {
                return true;
            }
        }
    }
    return false;
}

function generateRandomTile() {
    if (!hasEmptyTile()) {
        alert("Jogo finalizado!");
    }

    let found = false;

    while (!found) {
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);
        
        if (board[row][column] == 0) {
            board[row][column] = 2;
            let tile = document.getElementById(row.toString() + "-" + column.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (num > 0) {
        tile.innerText = num;
        if (num < 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        slideLeft();
        generateRandomTile();
    } else if (event.code == "ArrowRight") {
        slideRight();
        generateRandomTile();
    } else if (event.code == "ArrowUp") {
        slideUp();
        generateRandomTile();
    } else if (event.code == "ArrowDown") {
        slideDown();
        generateRandomTile();
    }
    document.getElementById("score").innerText = score;
})

function filterZeros(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZeros(row);

    for (let i = 0; i < row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZeros(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row = slide(row);
        board[i] = row;

        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[i] = row;

        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let j = 0; j < columns; j++) {
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row = slide(row);

        for (let i = 0; i < rows; i++) {
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let j = 0; j < columns; j++) {
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row = row.reverse();
        row = slide(row);
        row = row.reverse();

        for (let i = 0; i < rows; i++) {
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}