const { stockAPI } = require("../api");

const { wrapAsync } = require("../infra");

module.exports = (app) => {
  app.route("/stock").get(wrapAsync(stockAPI.list));
};
