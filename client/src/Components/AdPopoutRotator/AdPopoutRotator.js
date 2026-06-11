import React, { Component } from "react";

class AdPopoutRotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeIndex: 0,
      secondsLeft: 5,
      paused: false,
    };

    // Default 5 images (you can pass your own via props.images)
    this.defaultImages = [
      "/ads/ad1.jpg",
      "/ads/ad2.jpg",
      "/ads/ad3.jpg",
      "/ads/ad4.jpg",
      "/ads/ad5.jpg",
    ];

    this.targetUrl = "https://capgainco.com/";
    this.tickInterval = null;
    this.rotateTimeout = null;
  }

  componentDidMount() {
    this.startCycle();
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  clearTimers = () => {
    if (this.tickInterval) clearInterval(this.tickInterval);
    if (this.rotateTimeout) clearTimeout(this.rotateTimeout);
    this.tickInterval = null;
    this.rotateTimeout = null;
  };

  startCycle = () => {
    this.clearTimers();

    // Open immediately (optional). If you want first open after 5s, comment this out.
    this.setState({ isOpen: true, secondsLeft: 5 });

    // countdown label
    this.tickInterval = setInterval(() => {
      if (this.state.paused) return;

      this.setState((prev) => ({
        secondsLeft: prev.secondsLeft > 1 ? prev.secondsLeft - 1 : 5,
      }));
    }, 1000);

    // rotate ad every 5 seconds
    const rotate = () => {
      if (!this.state.paused) {
        this.setState((prev) => ({
          isOpen: true,
          activeIndex: (prev.activeIndex + 1) % this.getImages().length,
          secondsLeft: 5,
        }));
      }

      this.rotateTimeout = setTimeout(rotate, 5000);
    };

    this.rotateTimeout = setTimeout(rotate, 5000);
  };

  getImages = () => {
    const imgs = this.props.images && this.props.images.length ? this.props.images : this.defaultImages;
    return imgs.slice(0, 5); // ensure max 5
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  onClickAd = () => {
    // redirect to capgainco.com
    window.open(this.targetUrl, "_blank", "noopener,noreferrer");
  };

  togglePause = (val) => {
    this.setState({ paused: val });
  };

  render() {
    const { isOpen, activeIndex, secondsLeft } = this.state;
    const images = this.getImages();
    const currentImage = images[activeIndex];

    return (
      <>
        <style>{`
          .capgain-ad-wrap{
            position: fixed;
            right: 18px;
            bottom: 18px;
            width: 320px;
            z-index: 999999;
            font-family: Arial, sans-serif;
          }
          .capgain-ad-card{
            background: rgba(10,10,10,0.92);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.45);
            transform: translateY(0);
            opacity: 1;
            transition: transform .25s ease, opacity .25s ease;
          }
          .capgain-ad-card.hidden{
            transform: translateY(18px);
            opacity: 0;
            pointer-events: none;
          }
          .capgain-ad-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 12px;
            background: rgba(255,255,255,0.04);
          }
          .capgain-ad-badge{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: rgba(255,255,255,0.9);
          }
          .capgain-ad-dot{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 0 4px rgba(34,197,94,0.18);
          }
          .capgain-ad-actions{
            display: flex;
            gap: 8px;
          }
          .capgain-ad-btn{
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.10);
            color: rgba(255,255,255,0.9);
            padding: 6px 10px;
            border-radius: 10px;
            font-size: 12px;
            cursor: pointer;
            transition: transform .15s ease, background .15s ease;
          }
          .capgain-ad-btn:hover{
            transform: translateY(-1px);
            background: rgba(255,255,255,0.12);
          }
          .capgain-ad-body{
            position: relative;
            cursor: pointer;
          }
          .capgain-ad-img{
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
          }
          .capgain-ad-overlay{
            position: absolute;
            left: 0; right: 0; bottom: 0;
            padding: 10px 12px;
            background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
            color: #fff;
          }
          .capgain-ad-title{
            font-size: 14px;
            font-weight: 700;
            margin: 0 0 3px 0;
          }
          .capgain-ad-sub{
            font-size: 12px;
            opacity: 0.92;
            margin: 0;
          }
          .capgain-ad-footer{
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .capgain-ad-link{
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            opacity: 0.92;
          }
          .capgain-ad-timer{
            font-size: 12px;
            color: rgba(255,255,255,0.75);
          }
        `}</style>

        <div
          className="capgain-ad-wrap"
          onMouseEnter={() => this.togglePause(true)}
          onMouseLeave={() => this.togglePause(false)}
        >
          <div className={`capgain-ad-card ${isOpen ? "" : "hidden"}`}>
            <div className="capgain-ad-top">
              <div className="capgain-ad-badge">
                <span className="capgain-ad-dot" />
                <span>Sponsored • CapGainCo</span>
              </div>

              <div className="capgain-ad-actions">
                <button className="capgain-ad-btn" onClick={this.onClose} type="button">
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="capgain-ad-body" onClick={this.onClickAd} role="button" tabIndex={0}>
              <img className="capgain-ad-img" src={currentImage} alt="CapGainCo Ad" />
              <div className="capgain-ad-overlay">
                <p className="capgain-ad-title">Try CapGainCo Today</p>
                <p className="capgain-ad-sub">Click to visit capgainco.com</p>
              </div>
            </div>

            <div className="capgain-ad-footer">
              <div className="capgain-ad-link">capgainco.com</div>
              <div className="capgain-ad-timer">Next ad in: {secondsLeft}s</div>
            </div>
          </div>
        </div> 
          
      </>
    );
  }
}

export default AdPopoutRotator;
