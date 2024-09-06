import Rollbar from "rollbar";

export default new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
