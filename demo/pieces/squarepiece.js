class SquarePiece extends GamePiece {
  constructor(x, gameController, dataContext, color, playerToken) {
    super(PIECE_TYPES.SQ_PIECE, x, gameController, dataContext, color, playerToken);
    this.squares = this.generateSquares();
  }

  initializePosition(squares) {
    squares[0].i = 0;
    squares[0].j = this.x;
    squares[1].i = 0;
    squares[1].j = this.x +1;
    squares[2].i = 1;
    squares[2].j = this.x;
    squares[3].i = 1;
    squares[3].j = this.x +1;
    return squares;
  }

  getNextClockwiseRotatedState() {
    var nextState = Util.deepCopyArray(this.squares);
    var nextRotationState = null;
    return {
      nextState: nextState,
      nextRotationState: ROTATION_STATE.ONE
    };
  }
}
