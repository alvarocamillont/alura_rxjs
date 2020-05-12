const { portfolioAPI } = require("../api");

const { wrapAsync, auth } = require("../infra");

module.exports = (app) => {
  app.route("/portfolios")
    .post(auth, wrapAsync(portfolioAPI.add))
    //.get(wrapAsync(portfolioAPI.list));
  

  //app
    //.route("/:userName/portfolios/:portfolioId")
    //.post(auth, wrapAsync(portfolioAPI.add))
    //.delete(auth, wrapAsync(portfolioAPI.remove))
    //.get(wrapAsync(portfolioAPI.findById));
};
