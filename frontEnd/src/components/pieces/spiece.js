import GamePiece from '../gamepiece';
import Util from '../../utils/util';
import ROTATION_STATE from '../gamecontroller';
import PIECE_TYPES from '../gamecontroller';

class SPiece extends GamePiece {
    constructor(x, gameController, dataContext, color, playerToken) {
        super(PIECE_TYPES.S_PIECE, x, gameController, dataContext, color, playerToken);
        this.squares = this.generateSquares();
    }

    initializePosition(squares) {
        // [0] represents bottom left of s piece
        squares[0].i = 0;
        squares[0].j = this.x;
        squares[1].i = 1;
        squares[1].j = this.x;
        squares[2].i = 1;
        squares[2].j = this.x +1;
        squares[3].i = 2;
        squares[3].j = this.x +1;
        return squares;
      }

    getNextClockwiseRotatedState() {
        var nextState = Util.deepCopyArray(this.squares);
        var nextRotationState = null;
        console.log(nextRotationState);

        if (this.rotationState == ROTATION_STATE.ONE) {
            // update bottom left
            nextState[0].i += 1;
            nextState[0].j += 1;

            // update top left
            nextState[2].i += 1;
            nextState[2].j -= 1;

            // update top right
            nextState[3].j -= 2;

            nextRotationState = ROTATION_STATE.TWO;
        } else if (this.rotationState == ROTATION_STATE.TWO) {
            // update bottom left
            nextState[0].i += 1;
            nextState[0].j -= 1;

            // update top left
            nextState[2].i -= 1;
            nextState[2].j -= 1;

            // update top right
            nextState[3].i -= 2;

            nextRotationState = ROTATION_STATE.THREE;
        } else if (this.rotationState == ROTATION_STATE.THREE) {
            // update bottom left
            nextState[0].i -= 1;
            nextState[0].j -= 1;

            // update top left
            nextState[2].i -= 1;
            nextState[2].j += 1;

            // update top right
            nextState[3].i -= 2;

            nextRotationState = ROTATION_STATE.ONE;
        }

    return {
        nextState: nextState,
        nextRotationState: nextRotationState
        };
    }
}

export default SPiece;