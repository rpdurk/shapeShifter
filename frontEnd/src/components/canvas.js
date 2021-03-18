import react from 'react';
import GameController from './gamecontroller';
import GamePiece from './gamepiece';
import LPiece from '../components/pieces/lpiece';
import ReverseLPiece from '../components/pieces/reverselpiece';
import TPiece from '../components/pieces/tpiece';
import SquarePiece from '../components/pieces/squarepiece';
import LinePiece from '../components/pieces/linepiece';
import SPiece from '../components/pieces/spiece';
import ZPiece from '../components/pieces/zpiece';

import Group from 'react-canvas';
import Text from 'react-canvas';
// <canvas id="canvas" width="400" height="800"></canvas>

export const canvas = () => {
    return (
        <>
            <Text style={textStyle}>
                Welcome to ShapeShifter, play, collaborate, compete, win, the choice is yours.
            </Text>
        <Group>
            width: 400,
            height: 800
        </Group>
        </>
)
};
