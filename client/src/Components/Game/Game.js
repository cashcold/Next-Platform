import React, { Component } from 'react';
import axios from 'axios';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiplier: 1.0,
      gameRunning: false,
      intervalId: null,
      result: null,
      crashAt: 0,
      cashedOut: false,
    };
  }

  startGame = async () => {
    const res = await axios.get('users/api/start');
    const crashAt = parseFloat(res.data.multiplier);

    this.setState({
      multiplier: 1.0,
      gameRunning: true,
      crashAt,
      result: null,
      cashedOut: false,
    });

    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        const newMultiplier = parseFloat((prevState.multiplier + 0.05).toFixed(2));
        if (newMultiplier >= crashAt) {
          clearInterval(this.state.intervalId);
          return {
            multiplier: crashAt,
            gameRunning: false,
            result: this.state.cashedOut ? '🟢 You Won!' : '🔴 You Lost!',
          };
        }
        return { multiplier: newMultiplier };
      });
    }, 100);

    this.setState({ intervalId });
  };

  cashOut = () => {
    if (this.state.gameRunning && !this.state.cashedOut) {
      clearInterval(this.state.intervalId);
      this.setState({
        gameRunning: false,
        cashedOut: true,
        result: `🟢 Cashed out at ${this.state.multiplier}x – You Win!`,
      });
    }
  };

  render() {
    return (
      <div className="game-container">
        <h1 className="title">✈️ Aviator Flight</h1>

        {/* Plane Animation */}
        <div className="sky">
          <div className={`plane ${this.state.gameRunning ? 'fly' : ''}`}>✈️</div>
        </div>

        {/* Multiplier Display */}
        <div className="multiplier-display">
          {this.state.multiplier.toFixed(2)}x
        </div>

        {/* Buttons */}
        <div className="controls">
          <button
            onClick={this.startGame}
            disabled={this.state.gameRunning}
            className="bet-button"
          >
            🎯 BET
          </button>

          <button
            onClick={this.cashOut}
            disabled={!this.state.gameRunning || this.state.cashedOut}
            className="cashout-button"
          >
            💰 CASH OUT
          </button>
        </div>

        {/* Result */}
        <div className="result-text">
          {this.state.result && <p>{this.state.result}</p>}
        </div>
      </div>
    );
  }
}

export default Game;
