import React, { Component, createRef } from 'react';

class AdsterraBannerClass extends Component {
  constructor(props) {
    super(props);
    this.adRef = createRef();
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    // 1. Evaluate current screen space on initial mount
    const mobileViewport = window.innerWidth < 768;
    this.setState({ isMobile: mobileViewport }, () => {
      this.injectAdUnit();
    });

    // 2. Attach a resize event listener to monitor dynamic browser adjustments
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const mobileViewport = window.innerWidth < 768;
    // Only re-trigger state changes if the user crosses the breakpoint line
    if (mobileViewport !== this.state.isMobile) {
      this.setState({ isMobile: mobileViewport }, () => {
        this.injectAdUnit();
      });
    }
  };

  injectAdUnit = () => {
    if (!this.adRef.current) return;

    // Clear out any stale script structures or existing active iframes
    this.adRef.current.innerHTML = '';

    const { isMobile } = this.state;

    // Assign structural variables based on active media viewport parameters
    const adKey = isMobile ? 'abff5aee4aec8b6cfd16d64dd30f2085' : '8b0272fa77860f96a1a7eae008c586a5';
    const adWidth = isMobile ? 320 : 728;
    const adHeight = isMobile ? 50 : 90;

    // 1. Assemble and inject the local configuration object script mapping
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      window.atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${adHeight},
        'width' : ${adWidth},
        'params' : {}
      };
    `;
    this.adRef.current.appendChild(configScript);

    // 2. Assemble and inject the external invocation execution script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

    this.adRef.current.appendChild(invokeScript);
  };

  render() {
    const { isMobile } = this.state;
    
    // Explicit sizing handles ensure safe boundaries around rendering iframe layers
    const wrapperWidth = isMobile ? '320px' : '728px';
    const wrapperMinHeight = isMobile ? '50px' : '90px';

    return (
      <div className="ad-container-wrapper" style={{ margin: '25px auto', textAlign: 'center', width: '100%' }}>
        <span style={{ display: 'block', fontSize: '11px', color: '#a0aec0', marginBottom: '8px', letterSpacing: '1px' }}>
          SPONSORED ADVERTISEMENT
        </span>

        {/* Dynamic target node injected using layout dimensions */}
        <div
          ref={this.adRef}
          id={`adsterra-banner-${wrapperWidth}`}
          style={{ 
            minHeight: wrapperMinHeight, 
            width: wrapperWidth, 
            display: 'inline-block', 
            background: 'transparent' 
          }}
        ></div>
      </div>
    );
  }
}

export default AdsterraBannerClass;