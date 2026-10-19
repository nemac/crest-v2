import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-2E98LXVQPJ";

// The dev site is also a production build, so it is excluded by its data channel.
export const analyticsEnabled = (env) =>
  Boolean(env.PROD) && env.VITE_CREST_DATA_CHANNEL !== "dev";

// Events sent before initialize are queued by react-ga4 and never delivered, so this one check turns all reporting off.
export const initAnalytics = (env = import.meta.env) => {
  if (!analyticsEnabled(env)) {
    return false;
  }
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send("pageview");
  return true;
};
