
const header = document.getElementsByClassName("header")
const info = document.getElementsByClassName("info")
const player = document.querySelector(".player-text")
const token = document.querySelector(".token")
const btn = document.querySelector(".btn")

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; 
let board = []; // array of cells  (board[y][x])


player.classList.add('player-text')
player.innerHTML = `Player ${currPlayer}'s turn`

// makeBoard: create in-JS board structure:
 

const makeBoard = () => {
  const grid = (x, y) => [ ...Array(x) ].map(val => Array(y).fill(null))
  board = grid(WIDTH, HEIGHT)

  // const grid = [
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  //   [ null, null, null, null, null, null, null ],
  // ];

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")

  // TODO: add comment for this code
  const top = document.createElement("tr"); //<-- create TableRow for the top
  top.setAttribute("id", "column-top"); //<-- set ID to column-top
  top.addEventListener("click", handleClick); //<-- add a click event for it

 


  for (let x = 0; x < WIDTH; x++) { //<-- iterate through the board array
    const headCell = document.createElement("td"); //<-- create the table data cell
    headCell.setAttribute("id", x); //<-- set the id to the index of array, one for each column
    top.append(headCell); //<-- append it to the top of the table
  }
  htmlBoard.append(top);



  
  for (let y = 0; y < HEIGHT; y++) { //<-- iterate through the board array to create columns
    const row = document.createElement("tr"); //<-- create row in the table
    row.classList.add("row")
    for (let x = 0; x < WIDTH; x++) { //<-- iterate through the board array to create rows
      const cell = document.createElement("td"); //<-- create the table data cell
      cell.setAttribute("id", `${y}-${x}`); //<-- set id of cell to the index on the grid
      row.append(cell); //<-- append to the board
    }
    htmlBoard.append(row); //<-- append the entire row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y > -1; y--) { //<-- Height - 1 = index of col
    if (!board[ y ][ x ]) {
      return y
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div")
  piece.classList.add("piece")
  piece.classList.add(`_${currPlayer}`)
  const square = document.getElementById(`${y}-${x}`)
  square.append(piece)
}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  alert(msg);
  player.textContent = `Congratulations! Player ${currPlayer} won!` //<-- change header text
  board = null
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[ y ][ x ] = currPlayer

  placeInTable(y, x);

  // check for win
  checkForWin() && endGame(`Congratulations! Player ${currPlayer} won!`);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board.every(row => row.every(cell => cell)) && endGame("Tie")

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
  currPlayer === 1 ? player.innerHTML = `Player ${currPlayer}'s turn` : player.innerHTML = `Player ${currPlayer}'s turn`
  currPlayer === 1 ? token.style.color = "tomato" : token.style.color = "#289ee7"
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([ y, x ]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[ y ][ x ] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //<-- loops over the columns
    for (let x = 0; x < WIDTH; x++) { //<-- loops over the rows
      const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ]; //<-- calculates if rows and cols
      const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ]; // match up horz, vert, or diag
      const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
      const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //<-- conditional to check if tokens
        return true;                                                   // line up horz, vert, or diagonally
      }
    }
  }
}

// Button to reset the game
btn.addEventListener('click', () => {
  window.location.reload()
})

makeBoard();
makeHtmlBoard();