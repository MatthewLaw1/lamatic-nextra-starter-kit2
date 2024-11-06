import Script from "next/script";

export const Hubspot = () => {
  return <Script src="https://js-eu1.hs-scripts.com/143255669.js" />;
};

export const hsPageView = (path: string) => {
  // @ts-ignore
  if (window._hsq) {
    // @ts-ignore
    window._hsq.push(["setPath", path]);
  }
};
