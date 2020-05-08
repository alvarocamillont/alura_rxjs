const { StockDao } = require("../infra");

const api = {};

api.add = async (req, res) => {
  const { code, description, price } = req.body;
  console.log(req.body);
  const stockDao = new StockDao(req.db);

  const stockid = await stockDao.add(code, description, price);
  const stock = await stockDao.findById(stockid);
  console.log(`Stock added`, stock);
  res.json(stock);
};

api.list = async (req, res) => {
  let { value } = req.query;
  value = value || "";
  console.log(`Get stock by ${value}`);
  const stocks = await new StockDao(req.db).listAll(value);
  res.json(stocks);
};

module.exports = api;
