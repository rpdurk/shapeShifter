import { Component } from 'react';
import GameController from '../components/gamecontroller';

class GamePage extends Component {
  componentDidMount() {
  debugger;
    const canvas = this.refs.canvas;

    // Initialize a 2d canvas context
    const canvasContext = canvas.getContext("2d");

    window.gameController = new GameController(canvasContext);
    window.gameController.startGame();
  }

  render() {
    return <canvas ref="canvas" width="400" height="800"></canvas>
  }
}

export default GamePage;