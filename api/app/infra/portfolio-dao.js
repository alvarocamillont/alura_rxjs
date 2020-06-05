const portFolioHeader = (model, user_id) => {
  const { portfolio_id, portfolio_description } = model;
  return {
    portfolio_id,
    portfolio_description,
    user_id,
  };
};

class PortfolioDao {
  constructor(db) {
    this._db = db;
  }

  add(model, user_id, portfolio_id) {
    const header = portFolioHeader(model, user_id);
    const { items } = model;
    const id = portfolio_id || header.portfolio_id;
    if (id) {
      return this.updateModel(id, header, items);
    } else {
      return this.insertModel(header, items);
    }
  }

  remove(portfolio_id) {
    const deleteItems = this.deleteAllItems(portfolio_id);
    const deletePortFolio = this.deletePortfolio(portfolio_id);
    return Promise.all([deleteItems, deletePortFolio]);
  }

  updateModel(portfolio_id, header, items) {
    const { portfolio_description } = header;
    const self = this;
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          UPDATE portfolio
              SET portfolio_description = ?
          WHERE
              portfolio_id = ?
        `,
        [portfolio_description, portfolio_id],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t update portfolio");
          }
          self.saveItems(portfolio_id, items).then(
            () => {
              resolve(portfolio_id);
            },
            (err) => {
              console.log(err);
              return reject("Can`t add portfolio item");
            }
          );
        }
      );
    });
  }

  insertModel(header, items) {
    const { portfolio_description, user_id } = header;
    const self = this;
    return new Promise((resolve, reject) => {
      this._db.run(
        `
                INSERT INTO portfolio (
                    portfolio_description, 
                    user_id,
                    portfolio_create_date
                    ) values (?,?,?)
                `,
        [portfolio_description, user_id, new Date()],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t add portfolio");
          }
          self.saveItems(this.lastID, items).then(
            () => {
              resolve(this.lastID);
            },
            (err) => {
              console.log(err);
              return reject("Can`t add portfolio item");
            }
          );
        }
      );
    });
  }

  saveItems(portfolio_id, items) {
    const itemsPromise = items
      ? items.map((item) => this.insertItem(portfolio_id, item))
      : [Promise.resolve()];
    return Promise.all([...itemsPromise]);
  }

  insertItem(portfolio_id, item) {
    const { stock_id, item_quantity, item_price } = item;
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        INSERT INTO portfolio_item (
          portfolio_id,
          stock_id,	
          item_quantity,
          item_price
        ) values (?,?,?,?)
      `,
        [portfolio_id, stock_id, item_quantity, item_price],
        (err) => {
          if (err) {
            console.log(err);
            return reject("Can`t add portfolio item");
          }
          resolve();
        }
      );
    });
  }

  deleteAllItems(portfolio_id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        DELETE FROM portfolio_item where portfolio_id = ?;
      `,
        [portfolio_id],
        (err) => {
          if (err) {
            console.log("Delete item");
            console.log(err);
            return reject("Can`t add portfolio");
          }
          resolve();
        }
      );
    });
  }

  deletePortfolio(portfolio_id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        DELETE FROM portfolio where portfolio_id = ?;
      `,
        [portfolio_id],
        (err) => {
          if (err) {
            console.log("Delete header");
            console.log(err);
            return reject("Can`t delete portfolio");
          }
          resolve();
        }
      );
    });
  }

  listAllFromUser(user_id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
          SELECT
            portfolio_id,
            portfolio_description,
            user_id 
          FROM portfolio
          WHERE 
            user_id = ?
        `,
        [user_id],
        (err, rows) => {
          if (err) {
            console.log("++++ERRO+++");
            console.log(err);
            return reject("Can`t load portfolio");
          }
          return resolve(rows);
        }
      );
    });
  }

  findById(user_id, portfolio_id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
          SELECT
            portfolio.portfolio_id,
            portfolio_description,
            user_id,
            item_id,
            item_quantity,
            item_price,
            stock_id
          FROM portfolio 
          LEFT JOIN portfolio_item  ON
            portfolio.portfolio_id = portfolio_item.portfolio_id
          WHERE 
            user_id = ? AND
            portfolio.portfolio_id = ?
          ORDER BY
            item_id
        `,
        [user_id, portfolio_id],
        (err, rows) => {
          if (err) {
            console.log("++++ERRO+++");
            console.log(err);
            return reject("Can`t load portfolio");
          }
          const [first] = rows;
          if (first) {
            const header = {
              portfolio_id,
              portfolio_description: first.portfolio_description,
              user_id,
            };
            const items = rows.map((row) => ({
              item_quantity: row.item_quantity,
              item_price: row.item_price,
              stock_id: row.stock_id,
            }));
            return resolve({ ...header, items });
          }
          return resolve({});
        }
      );
    });
  }
}

module.exports = PortfolioDao;
