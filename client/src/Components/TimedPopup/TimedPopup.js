import React, { Component } from 'react';
import './TimedPopup.css';

class TimedPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      image: '',
      url: '',
      animate: false
    };

    this.timers = [];
    this.audio1 = new Audio('https://assets.mixkit.co/sfx/download/mixkit-bell-notification-933.mp3');
    this.audio2 = new Audio('https://assets.mixkit.co/sfx/download/mixkit-fast-rocket-whoosh-1714.mp3');
    this.audio3 = new Audio('https://assets.mixkit.co/sfx/download/mixkit-game-notification-wave-alert-987.mp3');
  }

  componentDidMount() {
    this.timers.push(setTimeout(() => this.showPopup(1), 30000)); // 30s
    this.timers.push(setTimeout(() => this.showPopup(2), 60000)); // 1min
    this.timers.push(setTimeout(() => this.showPopup(3), 90000)); // 1min 30s
    this.timers.push(setTimeout(() => this.showPopup(4), 120000)); // 2min
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
  }

  showPopup(index) {
    let image = '';
    let url = '';
    let sound = null;

    switch(index) {
      case 1:
        image = 'https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2Ftrading%20Platform.jpg?alt=media&token=c3503315-cce7-49d3-bd28-65c62147196b';
        sound = this.audio1;
        break;
      case 2:
        image = 'https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FsecretsTrading.jpg?alt=media&token=65852fda-237d-4d03-9475-cab2bdee6fb8';
        url = 'https://capgainco.com';
        sound = this.audio2;
        break;
      case 3:
        image = 'https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBlue%20and%20Grey%20Modern%203D%20Illustrative%20Online%20Seminar%20Facebook%20Ad.jpg?alt=media&token=bdedeaaa-121c-4d30-aa59-5312b97f51f8';
        url = 'https://capgainco.com';
        sound = this.audio3;
        break;
         case 4:
        image = 'https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FsecretsTrading.jpg?alt=media&token=65852fda-237d-4d03-9475-cab2bdee6fb8';
        url = 'https://capgainco.com';
        sound = this.audio2;
        break;
      default:
        break;
    }

    this.setState({ showPopup: true, image, url, animate: true }, () => {
      if (sound) sound.play();
    });

    setTimeout(() => {
      this.setState({ animate: false });
    }, 2000);
  }

  handleClick = () => {
    window.open(this.state.url, '_blank');
    this.setState({ showPopup: false });
  };

  render() {
    const { showPopup, image, animate } = this.state;

    return showPopup ? (
      <div className={`popup-wrapper ${animate ? 'popup-slide-in' : ''}`} onClick={this.handleClick}>
        <img src={image} alt="Ad" className="popup-image" />
      </div>
    ) : null;
  }
}

export default TimedPopup;
