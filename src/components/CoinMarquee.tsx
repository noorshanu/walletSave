import React, { useEffect, useRef } from 'react';

// Extend JSX to recognize the custom CoinGecko widget tag
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gecko-coin-price-marquee-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        locale?: string;
        'dark-mode'?: boolean;
        outlined?: boolean;
        'coin-ids'?: string;
        'initial-currency'?: string;
      };
    }
  }
}

const CoinMarquee: React.FC = () => {
  const widgetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scriptId = 'gecko-coin-price-marquee-widget-script';

    // Check if the script is already loaded to avoid duplication
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('CoinGecko widget script loaded successfully.');
      };

      script.onerror = () => {
        console.error('Failed to load CoinGecko widget script.');
      };
    }
  }, []);

  return (
    <div>
      {/* Use the widget reference to ensure it's only initialized once */}
      <gecko-coin-price-marquee-widget
        ref={widgetRef}
        locale="en"
        dark-mode={true}
        outlined={true}
        coin-ids=""
        initial-currency="usd"
      ></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default CoinMarquee;
