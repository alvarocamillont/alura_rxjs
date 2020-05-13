
const stockConverter = (row) => ({
  id: row.stock_id,
  code: row.stock_code,
  description: row.stock_description,
  price: parseFloat((Math.random() * (100 - 1) + 1).toFixed(2)),
});

class StockDao {
  constructor(db) {
    this._db = db;
  }

  add(code, description, price) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
                INSERT INTO stock (
                    stock_code, 
                    stock_description,
                    stock_price
                    ) values (?,?,?)
                `,
        [code, description, price],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t add stock");
          }
          resolve(this.lastID);
        }
      );
    });
  }

  listAll(value) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
              SELECT 
                    stock_id,stock_code,stock_description,stock_price
                FROM stock
                WHERE stock_code LIKE $code
			UNION 
			  SELECT 
                    stock_id,stock_code,stock_description,stock_price
                FROM stock
                WHERE stock_description LIKE $code
                `,
        { $code: `%${value}%` },
        (err, rows) => {
          if (err) {
            console.log("++++ERRO+++");
            console.log(err);
            return reject("Can`t load stock");
          }
          const stocks = rows.map(stockConverter);
          return resolve(stocks);
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
              SELECT 
                    stock_id,stock_code,stock_description,stock_price
                FROM stock
                WHERE stock_id = ?
                `,
        [id],
        (err, row) => {
          console.log(row);
          if (err) {
            console.log(err);
            return reject("Can`t load stock");
          }
          return resolve(stockConverter(row));
        }
      );
    });
  }
}

module.exports = StockDao;
