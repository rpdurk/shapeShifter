const HEIGHT = 800;
const WIDTH = 400;
const SIZE = 40;

const PIECE_TYPES = {
  L_PIECE : 0,
  L_PIECE_MIRROR : 1,
  Z_PIECE : 2,
  Z_PIECE_MIRROR : 3,
  T_PIECE : 4,
  SQ_PIECE : 5,
  LINE_PIECE : 6,
}

const ROTATION_STATE = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
}

const DEFAULT_L_COLOR = "#43AA8B";
const DEFAULT_T_COLOR = "#FF686B"
const DEFAULT_SQ_COLOR = "#d6b300";
const DEFAULT_LINE_COLOR = "#00819b";
const DEFAULT_S_COLOR = "#FF8C00";
const DEFAULT_Z_COLOR = "#00FF00";
const DEFAULT_REVERSE_L_COLOR = "#4B0082";

const COLORS = {
  [DEFAULT_L_COLOR]: "#B3DDD0", // default L color?
  [DEFAULT_T_COLOR]: "#ffb3b5", // default T color?
  [DEFAULT_SQ_COLOR]: "#ffe24d",
  [DEFAULT_LINE_COLOR]: "#4de1ff",
  [DEFAULT_S_COLOR]: "#FFA500",
  [DEFAULT_Z_COLOR]: "#7CFC00",
  [DEFAULT_REVERSE_L_COLOR]: "#9400D3",
}

const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;
const DOWN_ARROW_KEY_CODE = 40;

// How long to wait before continsly moving the piece
const HOLD_MOVE_INTERVAL_INITIAL = 100;
// How long to wait between squares when the left or right key is held
const HOLD_MOVE_INTERVAL = 50

function main() {
  const canvas = document.querySelector("#canvas");

  // Initialize a 2d canvas context
  const canvasContext = canvas.getContext("2d");

  window.gameController = new GameController(canvasContext);
  window.gameController.startGame();
}

class GameController {
  constructor(canvasContext) {
    this.canvasContext = canvasContext;
    this.gameDataContext = {
      squares: this.initializeGameData()
    }
    this.currentPiece = null;
  }

  startGame() {
    this.gameRunning = true;
    this.spawnPiece();
    this.gameLoop();

    var self = this;
    setTimeout(function() { self.pieceDropLoop(); }, 200);
  }

  stopGame() {
    this.gameRunning = false;
  }

  spawnPiece() {
    this.currentPiece = this.getRandomPiece();
    console.log(this.currentPiece.squares)
    // debugger;
    // TODO
    // check if the game is over
    if (this.currentPiece.willCollide(this.currentPiece.squares, true)) {
      this.currentPiece.updateDataContext();
      console.log("end");
      this.stopGame();
    } else {
      console.log("spawn ok");
    }
  }

  getRandomPiece() {
    var rand = Math.floor(Math.random() * 7);

    if (rand == 0) {
      return new LPiece(4, this, this.gameDataContext, DEFAULT_L_COLOR);
    } else if (rand == 1) {
      return new TPiece(4, this, this.gameDataContext, DEFAULT_T_COLOR);
    } else if (rand == 2) {
      return new SquarePiece(4, this, this.gameDataContext, DEFAULT_SQ_COLOR);
    } else if (rand == 3) {
      return new LinePiece(4, this, this.gameDataContext, DEFAULT_LINE_COLOR);
    } else if (rand == 4) {
      return new zPiece(4, this, this.gameDataContext, DEFAULT_Z_COLOR);
    } else if (rand == 5) {
      return new sPiece(4, this, this.gameDataContext, DEFAULT_S_COLOR);
    } else {
      return new reverseLPiece(4, this, this.gameDataContext, DEFAULT_REVERSE_L_COLOR);
    }
  }

  pieceDropLoop() {
    if (!this.gameRunning) {
      return;
    }

    // move piece
    this.currentPiece.update();

    var self = this;
    setTimeout(function() { self.pieceDropLoop(); }, 250);
  }

  gameLoop() {
    this.canvasContext.fillStyle = "#000000";
    this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
    this.gameDataContext.squares = this.initializeGameData();

    if (this.currentPiece.shouldLockPiece()) {
      this.currentPiece.lockPiece();

      // check for rows to clear and clear them
      this.clearRows();

      this.spawnPiece();
    } else {
      this.currentPiece.updateDataContext();
    }
    this.render(this.canvasContext, this.gameDataContext);

    if (!this.gameRunning) {
      return;
    }

    var self = this;
    setTimeout(function() { self.gameLoop(); }, 33);
  }

  clearRows() {
    // check for rows to clear
    var clearedRows = [];

    for(var i = 0; i < this.gameDataContext.squares.length; i++) {
      var currentRow = this.gameDataContext.squares[i];
      var shouldClearRow = true;
      for(var j = 0; j < currentRow.length; j++) {
        if (currentRow[j].isEmpty) {
          shouldClearRow = false;
        }
      }
      if (shouldClearRow) {
        clearedRows.push(i);
      }
    }

    // if rows were cleared kick off a loop to drop above pieces, with a delay
    if (clearedRows.length == 0) return;
    var self = this;
    setTimeout(function() { self.doClearRows(clearedRows); }, 150);
  }

  doClearRows(clearedRows) {
    clearedRows.forEach(i => {
      for(var j = 0; j < this.gameDataContext.squares[0].length; j++) {
        // read meta data and add to total score and player score
        this.gameDataContext.squares[i][j] = {
          isEmpty: true
        };
      }
    });

    var self = this;
    setTimeout(function() { self.dropClearedRows(clearedRows); }, 150);
  }

  dropClearedRows(clearedRows) {
    // starting from the end of the array,
    // move everything above that given index down,
    // remove the last element from the array,
    // continue recursively
    var currentIndex = clearedRows.pop();
    for (var i = currentIndex - 1; i >= 0; i--) {
      this.gameDataContext.squares[i+1] = this.gameDataContext.squares[i];
    }

    if (clearedRows.length == 0) return;

    // also update the cleared rows since they moved down
    for (var i = 0; i < clearedRows.length; i++) {
      clearedRows[i] += 1;
    }

    var self = this;
    setTimeout(function() { self.dropClearedRows(clearedRows); }, 150);
  }

  render() {
    var data = this.gameDataContext.squares;
    for(var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[i].length; j++) {
        if (!data[i][j].isEmpty) {
          var squareData = data[i][j];
          var square = new Square(squareData.color, SIZE * j, SIZE * i,
            this.canvasContext);
          square.render();
        }
      }
    }
  }

  initializeGameData() {
    var data = [];
    for(var i = 0; i < (HEIGHT/SIZE); i++) {
      var row = [];
      for(var j = 0; j < (WIDTH/SIZE); j++) {
        if (!this.gameDataContext
          || !this.gameDataContext
          || !this.gameDataContext.squares[i][j]
          || !this.gameDataContext.squares[i][j].persistThoughNextRender) {
          row.push({
            isEmpty: true
          });
        } else {
          row.push(this.gameDataContext.squares[i][j]);
        }
      }
      data.push(row);
    }

    return data;
  }

  handleKeydown(event) {
    // TODO update these to be enums
    switch (event.keyCode) {
      case LEFT_ARROW_KEY_CODE:
        this.handleLeftKeyDown();
        // event.preventDefault();
        break;
      case 38:
        this.handleUpKeyDown();
        // event.preventDefault();
        break;
      case RIGHT_ARROW_KEY_CODE:
        this.handleRightKeyDown();
        // event.preventDefault();
        break;
      case DOWN_ARROW_KEY_CODE:
        this.handleDownKeyDown();
        // event.preventDefault();
        break;
      case 80:
        this.gameRunning = !this.gameRunning;
        break
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case LEFT_ARROW_KEY_CODE:
        this.handleLeftKeyUp();
        break;
      case RIGHT_ARROW_KEY_CODE:
        this.handleRightKeyUp();
        break;
      case DOWN_ARROW_KEY_CODE:
        this.handleDownKeyUp();
    }
  }

  handleDownKeyDown() {
    if (this.currentPiece == null || this.downKeyIsDown) {
      return;
    }

    this.downKeyIsDown = true;
    this.currentPiece.moveDown();

    // schedule a method to continuously move down
    var self = this;
    setTimeout(function() { self.moveDownContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL_INITIAL);
  }

  handleDownKeyUp() {
    this.downKeyIsDown = false;
  }

  moveDownContinuously() {
    if (!this.downKeyIsDown) return;

    this.currentPiece.moveDown();
    var self = this;
    setTimeout(function() { self.moveDownContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL);
  }

  handleLeftKeyDown() {
    if (this.currentPiece == null || this.leftKeyIsDown) {
      return;
    }

    this.leftKeyIsDown = true;
    this.currentPiece.moveLeft();

    // schedule a method to continuously move left
    var self = this;
    setTimeout(function() { self.moveLeftContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL_INITIAL);
  }

  handleLeftKeyUp() {
    this.leftKeyIsDown = false;
  }

  handleRightKeyDown() {
    if (this.currentPiece == null || this.rightKeyIsDown) {
      return;
    }

    this.rightKeyIsDown = true;
    this.currentPiece.moveRight();

    // schedule a method to continuously move right
    var self = this;
    setTimeout(function() { self.moveRightContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL_INITIAL);
  }

  moveLeftContinuously() {
    if (!this.leftKeyIsDown) return;

    this.currentPiece.moveLeft();
    var self = this;
    setTimeout(function() { self.moveLeftContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL);
  }

  moveRightContinuously() {
    if (!this.rightKeyIsDown) return;

    this.currentPiece.moveRight();
    var self = this;
    setTimeout(function() { self.moveRightContinuously(HOLD_MOVE_INTERVAL); }, HOLD_MOVE_INTERVAL);
  }

  handleRightKeyUp() {
    this.rightKeyIsDown = false;
  }

  handleUpKeyDown() {
    if (this.currentPiece == null) {
      return;
    }

    this.currentPiece.rotateClockwise();
  }
}

window.onload = main;

document.onkeydown = function(event) {
  window.gameController.handleKeydown(event);
};
document.onkeyup = function(event) {
  window.gameController.handleKeyUp(event);
}

class Square {
  constructor(color, x, y, ctx) {
    this.color1 = color;
    this.color2 = COLORS[color];
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = SIZE;
  }

  render() {
    const size = this.size;
    this.ctx.fillStyle = this.color1;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.fillStyle = this.color2;
    this.ctx.fillRect(this.x + 4, this.y + 4, this.size - 8, this.size - 8);
  }
}
