const { PortfolioDao, UserDao } = require("../infra");

const api = {};

const userCanDelete = (user) => (portfolio) => portfolio.userId == user.id;

api.add = async (req, res) => {
  console.log("####################################");
  console.log("Received JSON data", req.body);
  const portfolio = req.body;
  const id = await new PortfolioDao(req.db).add(portfolio, req.user.id);
  res.json(id);
};

api.list = async (req, res) => {
  console.log("####################################");
  console.log(`Listing portfolios`);
  const portfolios = await new PortfolioDao(req.db).listAllFromUser(
    req.user.id
  );
  res.json(portfolios);
};

/*

api.findById = async (req, res) => {
    const { portfolioId } = req.params;
    console.log('####################################');
    console.log(`Finding PortFolio for ID ${portfolioId}`)
    const portfolio = await new PortfolioDao(req.db).findById(portfolioId);
    if (portfolio) {
        res.json(portfolio);
    } else {
        res.status(404).json({ message: 'Portfolio does not exist'})
    }  
};

api.remove = async (req, res) => {
    const user = req.user;
    const { portfolioId } = req.params;
    const dao = new PortfolioDao(req.db);
    const portfolio = await dao.findById(portfolioId);
    if (!portfolio) {
        const message = 'PortfolioId does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanDelete(user)(portfolio)) {
        await dao.remove(portfolioId)
        console.log(`Photo ${portfolioId} deleted!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can delete photo from user ${portfolio.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};
*/

module.exports = api;
