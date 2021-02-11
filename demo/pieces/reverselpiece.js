class reverseLPiece extends GamePiece {
    constructor(x, gameController, dataContext, color) {
       super(PIECE_TYPES.REVERSE_L_PIECE, x, gameController, dataContext, color);
       this.squares = this.generateSquares();
    }

    generateSquares() {
        return [{
            i: 0,
            j: this.x,
        }, {
            i: 1,
            j: this.x,
        },{
            i: 2,
            j: this.x,
        },{
            // Can I use -1 for this set up or does it need to be built from that point?
            i: 2,
            j: this.x -1
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