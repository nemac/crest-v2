import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-2E98LXVQPJ";

// The dev site is also a production build, so it is excluded by its data channel.
export const analyticsEnabled = (env) =>
  Boolean(env.PROD) && env.VITE_CREST_DATA_CHANNEL !== "dev";

// Without initialize, react-ga4 only pushes events onto window.dataLayer and Google's script never loads, so nothing is sent.
export const initAnalytics = (env = import.meta.env) => {
  if (!analyticsEnabled(env)) {
    return false;
  }
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send("pageview");
  return true;
};
