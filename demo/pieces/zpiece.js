class zPiece extends GamePiece {
    constructor(x, gameController, dataContext, color, playerToken) {
        super(PIECE_TYPES.Z_PIECE, x, gameController, dataContext, color, playerToken);
        this.squares = this.generateSquares();
    }

    initializePosition(squares) {
        // [0] represents top left of z
        squares[0].i = 0;
        squares[0].j = this.x;
        squares[1].i = 0;
        squares[1].j = this.x -1;
        squares[2].i = 1;
        squares[2].j = this.x -1;
        squares[3].i = 1;
        squares[3].j = this.x -2;
        return squares;
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
            nextState[2].j += 1;

            // update bottom right
            nextState[3].i -= 2;

            nextRotationState = ROTATION_STATE.TWO;
        } else if (this.rotationState == ROTATION_STATE.TWO) {
            // update top piece
            nextState[0].i += 1;
            nextState[0].j -= 1;

            // update bottom left
            nextState[2].i += 1;
            nextState[2].j += 1;

            // update bottom right
            nextState[3].j += 2;

            nextRotationState = ROTATION_STATE.THREE;
        } else if (this.rotationState == ROTATION_STATE.THREE) {
            // update top piece
            nextState[0].i -= 1;
            nextState[0].j -= 1;

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