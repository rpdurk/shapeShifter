class sPiece extends GamePiece {
    constructor(x, gameController, dataContext, color) {
        super(PIECE_TYPES.S_PIECE, x, gameController, dataContext, color);
        this.squares = this.generateSquares();
    }
// confirm generate square shape works
    generateSquares() {
        return [{
            i: 0,
            j: this.x,
        },{
            i: 0,
            j: this.x +1,
        },{
            i: 1,
            j: this.x +1,
        },{
            i: 1,
            j: this.x +2,
        }]
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