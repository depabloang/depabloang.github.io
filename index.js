import Game2048 from "./Game2048.js";


const game = new Game2048();
function createBoard() {
 for(let row = 0; row < game.board.length; row++) {
    for(let col = 0; col < game.board[0].length; col++) {
        let tile = document.createElement("div");

        tile.id = row.toString() + "-" + col.toString();
        let num = game.board[row][col];
        update(tile, num);
        document.querySelector(".container").append(tile);
        
    } 
 }   
}

function update(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0) {
        tile.innerText = num;
        tile.classList.add("tile-" + num.toString());
    }
}
function updateBoard() {
    for(let row = 0; row < game.board.length; row++) {
        for(let col = 0; col < game.board[0].length; col++) {
            let tile = document.getElementById(row.toString() + "-" + col.toString());
            let num = game.board[row][col];
            update(tile, num);
        }
    }
}
createBoard();

document.getElementById("new-game").addEventListener("click", () => {
    game.restart();
    updateBoard();
})

try {
    document.querySelector('body').addEventListener("keyup", (e) => {
        if(e.key === 'd' || e.key === 'D') {
            game.moveRight();
            game.next();
            updateBoard();
        }
        if(e.key === 'a' || e.key === 'A') {
            game.moveLeft();
            game.next();
            updateBoard();
        }
        if(e.key === 'w' || e.key === 'W') {
            game.moveUp();
            game.next();
            updateBoard();
        }
        if(e.key === 's' || e.key === 'S') {
            game.moveDown();
            game.next();
            updateBoard();
        } 
    });
}catch(ex) {
    console.log("Document reference only available when executing in browser");
}

game.next();
   