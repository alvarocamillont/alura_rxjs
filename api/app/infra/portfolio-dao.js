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

  add(model, user_id) {
    const header = portFolioHeader(model, user_id);
    const { items } = model;
    if (header.portfolio_id) {
      return this.updateModel(header.portfolio_id, header, items);
    } else {
      return this.insertModel(header, items);
    }
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
          self.saveItens(portfolio_id, items).then(
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
          self.saveItens(this.lastID, items).then(
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

  saveItens(portfolio_id, items) {
    const deletePromise = this.deleteAllItens(portfolio_id);
    const itensPromise = items.map((item) =>
      this.insertItem(portfolio_id, item)
    );
    return Promise.all([deletePromise, ...itensPromise]);
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

  deleteAllItens(portfolio_id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        DELETE FROM portfolio_item where portfolio_id = ?;
      `,
        [portfolio_id],
        (err) => {
          if (err) {
            console.log(err);
            return reject("Can`t add portfolio");
          }
          resolve();
        }
      );
    });
  }
}

module.exports = PortfolioDao;
