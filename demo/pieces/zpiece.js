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
        var nexState = Util.deepCopyArray(this.squares);
        var nextRotationState = null;

        if (this.rotationState == ROTATION_STATE.ONE) {
            // update top piece

            // update bottom left
        
            // update bottom right

            nextRotationState = ROTATION_STATE.TWO;
        } else if (this.rotationState == ROTATION_STATE.TWO) {
            // update top piece

            // update bottom left
        
            // update bottom right

            nextRotationState = ROTATION_STATE.THREE;
        } else if (this.rotationState == ROTATION_STATE.THREE) {
                        // update top piece

            // update bottom left
        
            // update bottom right

            nextRotationState = ROTATION_STATE.ONE;
        }

    return {
        nextState: nextState,
        nextRotationState: nextRotationState
        };
    }
}