import { Component } from 'react';
import GameController from '../components/gamecontroller';

class GamePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.gameController = new GameController();
    window.gameController.startGame();
  }

  render() {
    console.log('did render');
    return <canvas id="canvas" width="400" height="800"></canvas>
  }
}

export default GamePage;