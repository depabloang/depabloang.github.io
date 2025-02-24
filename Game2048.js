
export default class Game2048 {
    board = [];
    /*
    constructor() {
        this.board = [
            [2,0,0,0],
            [0,4,0,0],
            [0,8,0,0],
            [0,16,0,0]
        ]

    }*/

    
    constructor(height = 4, width = 4) {
        for(let row = 0; row < height; row++) {
            let tempRow = [];
            for(let col = 0; col < width; col++) {
                tempRow.push(0);
            }

            this.board.push(tempRow);
        }

        this.next();
    }

    moveRight = () => {
        let columns = this.board[0].length;

        for(let row = 0; row < this.board.length; row++) {
            //Eliminar ceros
            this.board[row] = this.board[row].filter(number => number != 0);

            //Mover a la derecha 
            for(let tile = this.board[row].length - 1; tile >= 0; tile--){
                if(this.board[row][tile] === this.board[row][tile - 1]) {
                    this.board[row][tile - 1] += this.board[row][tile];
                    this.board[row][tile] = 0; 
                }
            }

            //Eliminar ceros
            this.board[row] = this.board[row].filter(number => number != 0);

            //Añadir ceros al lado izquierdo
            while(this.board[row].length < columns) {
                this.board[row].unshift(0);
            }

        }

    }

    moveLeft = () => {
        this.rotateBoard();
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
        this.rotateBoard();
    };

    moveUp = () => {
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard(); 
    };

    moveDown = () => {
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
    };
    
    rotateBoard = () => {
        //Para rotar hay que dar la vuelta cada fila y luego trasponerla en diagonal

        // Dar la vuelta a cada fila
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].reverse();
        }

        // Trasponer
        for (let i = 0; i < this.board.length; i++) {
            for (let j = i + 1; j < this.board.length; j++) {
                [this.board[i][j], this.board[j][i]] = [this.board[j][i], this.board[i][j]];
            }
        }
    };

    restart = () => {
        for(let row = 0; row < this.board.length; row++) {
            for(let col = 0; col < this.board[0].length; col++) {
                this.board[row][col] = 0;
            }
        }

        this.next();
    }

    next = () => {
        //añade un nuevo número 2 y pinta el tablero. Para su implementación se usan 2 métodos privados
        //newNumber() coloca un 2 en una posición vacía de manera aleatoria. El tablero no puede estar lleno
        //paint() permite representar el tablero de números en la interfaz
        if(this.isBoardFull()) {
            return;
        }
        const vector = this.newNumber();
        this.board[vector.x][vector.y] = 2;
        this.paint();
    }

    newNumber = () => {
        let row = [];
        let col = [];
        let rowIndex = 0; 
        let colIndex = 0;
        let count; 

        //Recupera una fila que contenga espacios vacíos
        do {
            rowIndex = Math.floor(Math.random() * (this.board.length - 0) + 0);
            row = this.board[rowIndex];
            count = row.filter(tile => tile == 0).length;  
        }while(count == 0);

        //Guarda la posición en las que se encuentre espacios vacíos 
        for(let x = 0; x < row.length; x++) {
            if(row[x] == 0) {
                col.push(x);
            }
        }
        //Guarda una posición aleatorioa 
        colIndex = Math.floor(Math.random() * (col.length - 0) + 0);
        colIndex = col[colIndex];

        //Devuelve las posiciones aleatorias generadas de la fila y la columna
        return {x: rowIndex, y: colIndex};
    }

    paint = () => {
        this.board.forEach(row => {
            console.log(row);
        });

        console.log("------------------")
    }

    isBoardFull = () => { 
        for(let row of this.board) {
            for(let tile of row) {
                if(tile === 0) 
                    return false;
            }
        }

        return true;
        
    }
}

