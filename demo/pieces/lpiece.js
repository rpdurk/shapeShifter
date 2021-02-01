class LPiece extends GamePiece {
  constructor(x, gameController, dataContext, color) {
    super(PIECE_TYPES.L_PIECE, x, gameController, dataContext, color);
    this.squares = this.generateSquares();
  }

  generateSquares() {
    return [{
      i: 0,
      j: this.x,
    },{
      i: 1,
      j: this.x
    }, {
      i: 2,
      j: this.x
    }, {
      i: 2,
      j: this.x + 1
    }];
  }

  getNextClockwiseRotatedState() {
    var nextState = Util.deepCopyArray(this.squares);
    var nextRotationState = null;

    if (this.rotationState == ROTATION_STATE.ONE) {
      // update top piece
      nextState[0].i += 1;
      nextState[0].j += 1;

      // update bottom left
      nextState[2].i -= 1;
      nextState[2].j -= 1;

      // update bottom right
      nextState[3].j -= 2;

      nextRotationState = ROTATION_STATE.TWO;
    } else if (this.rotationState == ROTATION_STATE.TWO) {
      // update top piece
      nextState[0].i += 1;
      nextState[0].j -= 1;

      // update bottom left
      nextState[2].i -= 1;
      nextState[2].j += 1;

      // update bottom right
      nextState[3].i -= 2;

      nextRotationState = ROTATION_STATE.THREE;
    } else if (this.rotationState == ROTATION_STATE.THREE) {
      // update top piece
      nextState[0].i -= 1;
      nextState[0].j -= 1;

      // update bottom left
      nextState[2].i += 1;
      nextState[2].j += 1;

      // update bottom right
      nextState[3].j += 2;

      nextRotationState = ROTATION_STATE.FOUR;
    } else {
      // update top piece
      nextState[0].i -= 1;
      nextState[0].j += 1;

      // update bottom left
      nextState[2].i += 1;
      nextState[2].j -= 1;

      // update bottom right
      nextState[3].i += 2;

      nextRotationState = ROTATION_STATE.ONE;
    }

    return {
      nextState: nextState,
      nextRotationState: nextRotationState
    };
  }
}
