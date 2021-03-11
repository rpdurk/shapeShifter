import React from 'react';
import { Component } from 'react';
import GameController from '../components/gamecontroller';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    window.gameController = new GameController(this.myRef);
    window.gameController.startGame();
  }

  render() {
    console.log('did render');
    return <canvas ref={this.myRef} width="400" height="800"></canvas>
  }
}

export default GamePage;