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
    // Check initial device width on load
    const mobileViewport = window.innerWidth < 768;
    this.setState({ isMobile: mobileViewport }, () => {
      this.injectAdUnit();
    });

    // Watch for dynamic window screen resizing
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const mobileViewport = window.innerWidth < 768;
    if (mobileViewport !== this.state.isMobile) {
      this.setState({ isMobile: mobileViewport }, () => {
        this.injectAdUnit();
      });
    }
  };

  injectAdUnit = () => {
    if (!this.adRef.current) return;

    // Clear previous banner frame structures before injecting a new layout configuration
    this.adRef.current.innerHTML = '';

    const { isMobile } = this.state;

    // Assign keys and viewport dimensions based on active device properties
    const adKey = isMobile ? 'bd1be113b34bfe314e25de7b2237af2d' : '8b0272fa77860f96a1a7eae008c586a5';
    const adWidth = isMobile ? 300 : 728;
    const adHeight = isMobile ? 250 : 90;

    // 1. Create and append the contextual configuration object
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

    // 2. Create and append the remote script engine call
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

    this.adRef.current.appendChild(invokeScript);
  };

  render() {
    const { isMobile } = this.state;
    
    // Maintain exact dimensional boundaries around executing iframe assets
    const wrapperWidth = isMobile ? '300px' : '728px';
    const wrapperMinHeight = isMobile ? '250px' : '90px';

    return (
      <div className="ad-container-wrapper" style={{ margin: '25px auto', textAlign: 'center', width: '100%' }}>
        <span style={{ display: 'block', fontSize: '11px', color: '#a0aec0', marginBottom: '8px', letterSpacing: '1px' }}>
          SPONSORED ADVERTISEMENT
        </span>

        {/* Dynamic element targeted explicitly by the active script key */}
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