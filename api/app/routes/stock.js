const { stockAPI } = require("../api");

const { wrapAsync, auth } = require("../infra");

module.exports = (app) => {
  app
    .route("/stock")
    .get(wrapAsync(stockAPI.list))
    .post(auth, wrapAsync(stockAPI.add));
  
  app
    .route("/stock/:stockID")
    .get(wrapAsync(stockAPI.findById));
};
