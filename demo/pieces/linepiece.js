class LinePiece extends GamePiece {
  constructor(x, gameController, dataContext, color, playerToken) {
    super(PIECE_TYPES.T_PIECE, x, gameController, dataContext, color, playerToken);
    this.squares = this.generateSquares();
  }

  initializePosition(squares) {
    squares[0].i = 0;
    squares[0].j = this.x;
    squares[1].i = 1;
    squares[1].j = this.x;
    squares[2].i = 2;
    squares[2].j = this.x;
    squares[3].i = 3;
    squares[3].j = this.x;
    return squares;
  }

  getNextClockwiseRotatedState() {
    var nextState = Util.deepCopyArray(this.squares);
    var nextRotationState = null;

    if (this.rotationState == ROTATION_STATE.ONE) {
      nextState[0].i += 1;
      nextState[0].j += 1;

      nextState[2].i -= 1;
      nextState[2].j -= 1;

      nextState[3].i -= 2;
      nextState[3].j -= 2;

      nextRotationState = ROTATION_STATE.TWO;
    } else if (this.rotationState == ROTATION_STATE.TWO) {
      nextState[0].i -= 1;
      nextState[0].j -= 1;

      nextState[2].i += 1;
      nextState[2].j += 1;

      nextState[3].i += 2;
      nextState[3].j += 2;

      nextRotationState = ROTATION_STATE.ONE;
    }

    return {
      nextState: nextState,
      nextRotationState: nextRotationState
    };
  }
}
