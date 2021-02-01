class SquarePiece extends GamePiece {
  constructor(x, gameController, dataContext, color) {
    super(PIECE_TYPES.SQ_PIECE, x, gameController, dataContext, color);
    this.squares = this.generateSquares();
  }

  generateSquares() {
    return [{
      i: 0,
      j: this.x,
    },{
      i: 0,
      j: this.x + 1
    }, {
      i: 1,
      j: this.x
    }, {
      i: 1,
      j: this.x + 1
    }];
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
