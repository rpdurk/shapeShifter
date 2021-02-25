class GamePiece {
  // TODO reconcile gameController and gameDataContext, should only need one
  constructor(type, x, gameController, gameDataContext, color, playerToken) {
    this.type = type;
    this.x = x;
    this.gameDataContext = gameDataContext;
    this.color = color;
    this.rotationState = ROTATION_STATE.ONE
    this.playerToken = playerToken;
  }

  generateSquares() {
    let squares = [];
    for (let i= 0; i <= 3; i++) {
      squares.push({playerToken: this.playerToken
      })
    }
    return this.initializePosition(squares)
  }

  update() {
    this.moveDown();
  }

  moveLeft() {
    var nextState = this.leftShift(this.squares);
    if (this.willCollide(nextState)) {
      return;
    }

    this.squares = nextState;
  }

  moveRight() {
    var nextState = this.rightShift(this.squares);
    if (this.willCollide(nextState)) {
      return;
    }

    this.squares = nextState;
  }

  moveDown() {
    var nextState = this.downShift(this.squares);
    if (this.willCollide(nextState)) {
      return;
    }

    this.squares = nextState;
  }

  rotateClockwise() {
    const nextClockwiseRotatedState = this.getNextClockwiseRotatedState();
    var collisionResult = this.checkCollisionsAndProvideUpdatedState(
      nextClockwiseRotatedState.nextState);
    if (collisionResult.canApplyNextState) {
      this.squares = collisionResult.nextState;
      this.rotationState = nextClockwiseRotatedState.nextRotationState;
    }

    return;
  }

  shouldLockPiece() {
    return this.willCollide(this.downShift(this.squares));
  }

  lockPiece() {
    this.squares.forEach(square => {
      this.gameDataContext.squares[square.i][square.j] = {
        isEmpty: false,
        persistThoughNextRender: true,
        color: this.color
      }
    });
  }

  checkCollisionsAndProvideUpdatedState(state) {
    var canApplyNextState = true;
    var nextState = state;

    if (this.willCollide(state)) {
      // try shifting right
      if (!this.willCollide(this.rightShift(state))) {
        nextState = this.rightShift(state);
      }
      // try shifting left
      else if (!this.willCollide(this.leftShift(state))) {
        nextState = this.leftShift(state);
      }

      // try shifting up
      else if(!this.willCollide(this.upShift(state))) {
        nextState = this.upShift(state);
      }

      // try shifting down
      else if(!this.willCollide(this.upShift(state))) {
        nextState = this.upShift(state);
      } else {
        canApplyNextState = false;
      }
    }

    return {
      canApplyNextState: canApplyNextState,
      nextState: nextState
    };
  }

  willCollide(state) {
    var collision = false;
    state.forEach(square => {
      var i = square.i;
      var j = square.j;

      if (this.ownsPiece(i, j)) {
      }
      // check out of bounds
      else if (i < 0
        || i >= this.gameDataContext.squares.length
        || j < 0
        || j >= this.gameDataContext.squares[0].length) {
          collision = true;
        }

        // check square is not empty and is not of current piece
      else if (
        this.gameDataContext.squares[i][j].isEmpty == false
      ) {
        collision = true;
      }
    });
    return collision;
  }

  ownsPiece(i, j) {
    var owns = false;
    this.squares.forEach(square => {
      if (square.i == i && square.j == j ) {
        owns = true;
      }
    });
    return owns;
  }

  rightShift(state) {
    let copy = Util.deepCopyArray(state);
    for(var i = 0; i < copy.length; i++) {
      copy[i].j += 1;
    }
    return copy;
  }

  leftShift(state) {
    let copy = Util.deepCopyArray(state);
    for(var i = 0; i < copy.length; i++) {
      copy[i].j -= 1;
    }
    return copy;
  }

  upShift(state) {
    let copy = Util.deepCopyArray(state);
    for(var i = 0; i < copy.length; i++) {
      copy[i].i -= 1;
    }
    return copy;
  }

  downShift(state) {
    let copy = Util.deepCopyArray(state);
    for(var i = 0; i < copy.length; i++) {
      copy[i].i += 1;
    }
    return copy;
  }

  updateDataContext() {
    this.squares.forEach(square => {

      // errors when i is out of gamedata context bounds
      // should not allow i to be at that value when this method is called

      this.gameDataContext.squares[square.i][square.j] = {
        isEmpty: false,
        color: this.color
      }
    });
  }
}
