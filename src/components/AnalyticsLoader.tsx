import { useEffect } from 'react';
import universalData from '@/data/universal.json';

export const AnalyticsLoader = () => {
  const { integrations } = universalData;

  useEffect(() => {
    // Helper to check if script already exists to avoid duplicates
    const isScriptLoaded = (src: string) => {
      return !!document.querySelector(`script[src="${src}"]`);
    };

    // Google Analytics
    if (integrations?.googleAnalyticsId) {
      const src = `https://www.googletagmanager.com/gtag/js?id=${integrations.googleAnalyticsId}`;
      if (!isScriptLoaded(src)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${integrations.googleAnalyticsId}');
        `;
        document.head.appendChild(script2);
      }
    }

    // Google Ads
    if (integrations?.googleAdsPixelId) {
      // Load gtag lib if not already loaded by GA
      const src = `https://www.googletagmanager.com/gtag/js?id=${integrations.googleAdsPixelId}`;
      const gaSrc = integrations.googleAnalyticsId ? `https://www.googletagmanager.com/gtag/js?id=${integrations.googleAnalyticsId}` : '';
      
      if (!isScriptLoaded(src) && (!gaSrc || !isScriptLoaded(gaSrc))) {
         const script = document.createElement('script');
         script.src = src;
         script.async = true;
         document.head.appendChild(script);
      }

      // Config for Ads
      const script = document.createElement('script');
      script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${integrations.googleAdsPixelId}');
      `;
      document.head.appendChild(script);
    }

    // Meta Pixel
    if (integrations?.metaPixelId) {
      if (!window.fbq) { // Check if already initialized to avoid re-init error or duplicate
         const script = document.createElement('script');
         script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${integrations.metaPixelId}');
          fbq('track', 'PageView');
         `;
         document.head.appendChild(script);
      }
    }

  }, []);

  return null;
};

// Add typescript definition extension for window.fbq if needed, 
// strictly strictly speaking it's better to ignore or extend Window interface, 
// but for this file simple inclusion is fine.
declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    _fbq: any;
  }
}
