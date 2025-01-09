let board = [];
let score = 0;

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
  if (!value) return "#ccc0b3";
  switch (value) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ece0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#edc850";
    case 1024:
      return "#edc53f";
    case 2048:
      return "#edc22e";
    case 4096:
      return "#4e3f2f";
    case 8192:
      return "#3f2a1f";
    default:
      return "#3c2a1f";
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

// Klausome į rodyklių klavišus
function handleKeyPress(e) {
  switch (e.key) {
    case "ArrowUp":
      move("up");
      break;
    case "ArrowDown":
      move("down");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowRight":
      move("right");
      break;
    default:
      return;
  }
  addRandomTile();
}

document.addEventListener("keydown", handleKeyPress);

// Judėjimo funkcijos
function move(direction) {
  switch (direction) {
    case "up":
      moveUp();
      break;
    case "down":
      moveDown();
      break;
    case "left":
      moveLeft();
      break;
    case "right":
      moveRight();
      break;
    default:
      return;
  }
  updateBoard();
}

function moveUp() {
  for (let col = 0; col < 4; col++) {
    let column = [];
    // Imame visus elementus iš stulpelio
    for (let row = 0; row < 4; row++) {
      column.push(board[row][col]);
    }
    // Sujungiame ir perkeliame elementus į viršų
    column = merge(column);
    // Grąžiname juos atgal į stulpelį
    for (let row = 0; row < 4; row++) {
      board[row][col] = column[row];
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    let column = [];
    // Imame visus elementus iš stulpelio
    for (let row = 0; row < 4; row++) {
      column.push(board[row][col]);
    }
    // Sujungiame ir perkeliame elementus žemyn
    column = merge(column);
    // Grąžiname juos į stulpelį
    for (let row = 0; row < 4; row++) {
      board[row][col] = column[row];
    }
  }
}

function moveLeft() {
  flipBoard(); // Apverčiame lentą horizontaliai (eilutes darome stulpeliais)
  moveDown(); // Vykdome judėjimą žemyn
  flipBoard(); // Apverčiame lentą atgal
}

function moveRight() {
  flipBoard(); // Apverčiame lentą horizontaliai
  moveDown(); // Vykdome judėjimą žemyn
  flipBoard(); // Apverčiame lentą atgal
}

function transposeBoard() {
  let newBoard = [];
  for (let col = 0; col < 4; col++) {
    newBoard.push([]);
    for (let row = 0; row < 4; row++) {
      newBoard[col][row] = board[row][col];
    }
  }
  board = newBoard; // Įrašome pakeistą lentą
}

function flipBoard() {
  board.forEach((row) => row.reverse()); // Apverčiame kiekvieną eilutę
}

function merge(array) {
  // Pašaliname nulinės reikšmės
  let nonEmpty = array.filter((val) => val !== 0);

  for (let i = 0; i < nonEmpty.length - 1; i++) {
    if (nonEmpty[i] === nonEmpty[i + 1]) {
      nonEmpty[i] *= 2;
      nonEmpty[i + 1] = 0;
      score += nonEmpty[i]; // Pridedame taškus
    }
  }

  // Pašaliname vėl nulinės reikšmės ir užpildome su 0
  nonEmpty = nonEmpty.filter((val) => val !== 0);
  while (nonEmpty.length < 4) {
    nonEmpty.push(0);
  }
  return nonEmpty;
}

// Inicijuojame žaidimą
initGame();
