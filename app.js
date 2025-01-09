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
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
  addRandomTile();
}

document.addEventListener("keydown", handleKeyPress);

// Judėjimo funkcijos
function moveUp() {
  // Logika judėti aukštyn
}

function moveDown() {
  // Logika judėti žemyn
}

function moveLeft() {
  // Logika judėti į kairę
}

function moveRight() {
  // Logika judėti į dešinę
}

// Inicijuojame žaidimą
initGame();
