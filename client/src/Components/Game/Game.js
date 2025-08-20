import React, { Component } from "react";
import axios from "axios";
import "./Game.css";

export default class AviatorGame extends Component {
  state = {
    multiplier: 1,
    isFlying: false,
    isCrashed: false,
    crashPoint: null,
    intervalId: null,
    bet1: "",
    bet2: "",
    placed1: false,
    placed2: false,
    cashout1: null,
    cashout2: null,
  };

  componentDidMount() {
    this.startFlight();
  }

  startFlight = async () => {
    const res = await axios.get("http://localhost:8000/users/api/start");
    const crashPoint = parseFloat(res.data.multiplier);

    this.setState({
      multiplier: 1,
      isFlying: true,
      isCrashed: false,
      crashPoint,
      intervalId: setInterval(this.updateMultiplier, 100),
    });
  };

  updateMultiplier = () => {
    const { multiplier, crashPoint } = this.state;
    const newMultiplier = (multiplier + 0.01).toFixed(2);
    if (newMultiplier >= crashPoint) {
      clearInterval(this.state.intervalId);
      this.setState({ isFlying: false, isCrashed: true });
    } else {
      this.setState({ multiplier: parseFloat(newMultiplier) });
    }
  };

  handleBet = (which) => {
    if (this.state[`placed${which}`]) {
      // Cashout
      const cashoutAmount = (this.state[`bet${which}`] * this.state.multiplier).toFixed(2);
      this.setState({ [`cashout${which}`]: cashoutAmount, [`placed${which}`]: false });
    } else {
      // Place bet
      this.setState({ [`placed${which}`]: true });
    }
  };

  render() {
    const {
      multiplier,
      isFlying,
      isCrashed,
      bet1,
      bet2,
      placed1,
      placed2,
      cashout1,
      cashout2,
    } = this.state;

    return (
      <div className="aviator-container">
        <h2>✈️ Aviator Game</h2>
        <div className={`plane-area ${isFlying ? "flying" : isCrashed ? "crashed" : ""}`}>
          <img
            src="https://pngimg.com/uploads/plane/plane_PNG52444.png"
            alt="plane"
            className="plane"
          />
          <div className="multiplier-display">{multiplier.toFixed(2)}x</div>
        </div>

        <div className="bet-section">
          <div className="bet-box">
            <input
              type="number"
              value={bet1}
              onChange={(e) => this.setState({ bet1: e.target.value })}
              placeholder="Bet 1 Amount"
              disabled={placed1}
            />
            <button onClick={() => this.handleBet("1")} disabled={isCrashed}>
              {placed1 ? "Cashout" : "Bet"}
            </button>
            {cashout1 && <p>💰 Cashed Out: ${cashout1}</p>}
          </div>

          <div className="bet-box">
            <input
              type="number"
              value={bet2}
              onChange={(e) => this.setState({ bet2: e.target.value })}
              placeholder="Bet 2 Amount"
              disabled={placed2}
            />
            <button onClick={() => this.handleBet("2")} disabled={isCrashed}>
              {placed2 ? "Cashout" : "Bet"}
            </button>
            {cashout2 && <p>💰 Cashed Out: ${cashout2}</p>}
          </div>
        </div>
      </div>
    );
  }
}
