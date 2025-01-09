let board = [];
let score = 0;
let undoStack = []; // Saugo ankstesnes žaidimo būsenas

const gridContainer = document.getElementById("grid-container");
const scoreElement = document.getElementById("score");

// Inicializuojame žaidimo lentą
function initGame() {
  board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  score = 0;
  updateBoard();
  addRandomTile();
  addRandomTile();
  undoStack = []; // Išvalome "undo" istoriją, nes pradėjome naują žaidimą
}

// Atnaujiname lentą su plytelėmis
function updateBoard() {
  gridContainer.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const tileElement = document.createElement("div");
      tileElement.classList.add("tile");
      tileElement.textContent = tile || "";
      tileElement.style.backgroundColor = getTileColor(tile);
      tileElement.style.gridRowStart = rowIndex + 1;
      tileElement.style.gridColumnStart = colIndex + 1;
      gridContainer.appendChild(tileElement);
    });
  });
  scoreElement.textContent = `Taškai: ${score}`;
}

// Pasirinkti plytelių spalvą pagal jų vertę
function getTileColor(value) {
  if (!value) return "#6c5b3b"; // Tamsesnė pilka spalva tuščioms plytelėms
  switch (value) {
    case 2:
      return "#c4b69d";
    case 4:
      return "#d1b6a1";
    case 8:
      return "#e1844e";
    case 16:
      return "#e47846";
    case 32:
      return "#e24b3b";
    case 64:
      return "#e14e3a";
    case 128:
      return "#e0bf4e";
    case 256:
      return "#e0b241";
    case 512:
      return "#df9f34";
    case 1024:
      return "#df7f2d";
    case 2048:
      return "#df6c1a";
    case 4096:
      return "#6b4035";
    case 8192:
      return "#5b3327";
    default:
      return "#4e2f1c";
  }
}

// Papildoma plytelė
function addRandomTile() {
  const emptyTiles = [];
  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (!tile) emptyTiles.push({ row: rowIndex, col: colIndex });
    });
  });

  if (emptyTiles.length === 0) return;

  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;
  board[randomTile.row][randomTile.col] = newValue;
  updateBoard();
}

// Saugojame dabartinę būseną (prieš judėjimą)
function saveState() {
  undoStack.push({ board: JSON.parse(JSON.stringify(board)), score }); // Saugojame kopiją
}

// Klausome į rodyklių klavišus
function handleKeyPress(e) {
  switch (e.key) {
    case "ArrowUp":
      saveState(); // Išsaugome būseną prieš judėjimą
      moveUp();
      break;
    case "ArrowDown":
      saveState();
      moveDown();
      break;
    case "ArrowLeft":
      saveState();
      moveLeft();
      break;
    case "ArrowRight":
      saveState();
      moveRight();
      break;
    default:
      return;
  }
  addRandomTile();
}

document.addEventListener("keydown", handleKeyPress);

// Undo funkcija (grąžina paskutinę žaidimo būseną)
function undo() {
  if (undoStack.length > 0) {
    const lastState = undoStack.pop();
    board = lastState.board;
    score = lastState.score;
    updateBoard();
  }
}

// Mygtukas "Undo" (2 kartus per žaidimą)
const undoButton = document.getElementById("undo-button");
let undoCount = 0; // Skaitome, kiek kartų paspaustas "undo"

undoButton.addEventListener("click", () => {
  if (undoCount < 2) {
    undo();
    undoCount++;
  }
});

// Mygtukas "Pradėti iš naujo"
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
  initGame(); // Pradeda žaidimą nuo pradžių
});

// Judėjimo funkcijos (be lentos apvertimo)
function moveUp() {
  for (let col = 0; col < 4; col++) {
    let column = [];
    for (let row = 0; row < 4; row++) {
      column.push(board[row][col]);
    }
    column = merge(column);
    for (let row = 0; row < 4; row++) {
      board[row][col] = column[row];
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    let column = [];
    for (let row = 3; row >= 0; row--) {
      column.push(board[row][col]);
    }
    column = merge(column);
    for (let row = 3; row >= 0; row--) {
      board[row][col] = column[3 - row];
    }
  }
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    let line = board[row];
    line = merge(line);
    board[row] = line;
  }
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    let line = board[row].reverse();
    line = merge(line);
    board[row] = line.reverse();
  }
}

// Susijungimo funkcija
function merge(array) {
  let nonEmpty = array.filter((val) => val !== 0);

  for (let i = 0; i < nonEmpty.length - 1; i++) {
    if (nonEmpty[i] === nonEmpty[i + 1]) {
      nonEmpty[i] *= 2;
      nonEmpty[i + 1] = 0;
      score += nonEmpty[i];
    }
  }

  nonEmpty = nonEmpty.filter((val) => val !== 0);
  while (nonEmpty.length < 4) {
    nonEmpty.push(0);
  }
  return nonEmpty;
}

// Inicijuojame žaidimą
initGame();
