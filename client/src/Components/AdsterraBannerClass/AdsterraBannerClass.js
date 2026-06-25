import React, { Component, createRef } from 'react';

class AdsterraBannerClass extends Component {
  constructor(props) {
    super(props);
    // Create a React ref to target the specific DOM element container
    this.adRef = createRef();
  }

  componentDidMount() {
    // Check if the container exists and doesn't already have an active iframe inside
    if (this.adRef.current && !this.adRef.current.querySelector('iframe')) {
      
      // 1. Create and inject the atOptions configuration script element
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        window.atOptions = {
          'key' : '8b0272fa77860f96a1a7eae008c586a5',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      this.adRef.current.appendChild(configScript);

      // 2. Create and inject the external invoke.js script execution element
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/8b0272fa77860f96a1a7eae008c586a5/invoke.js';
      
      this.adRef.current.appendChild(invokeScript);
    }
  }

  render() {
    return (
      <div className="ad-container-wrapper" style={{ margin: '30px auto', textAlign: 'center', width: '100%' }}>
        {/* Label indicating it is a brand-safe advertisement section */}
        <span style={{ display: 'block', fontSize: '11px', color: '#a0aec0', marginBottom: '6px', letterSpacing: '1px' }}>
          SPONSORED ADVERTISEMENT
        </span>
        
        {/* The DOM element targeted by the external invoke script loop */}
        <div 
          ref={this.adRef} 
          id="adsterra-banner-728x90" 
          style={{ minHeight: '90px', display: 'inline-block', background: 'transparent' }}
        ></div>
      </div>
    );
  }
}

export default AdsterraBannerClass;