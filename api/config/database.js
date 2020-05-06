const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'alvaro', 'alvaro@bytebank.com', '123', 'Alvaro' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'alvaro')
`;

const INSERT_DEFAULT_USER_2 = `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'mario', 'mario@bytebank.com', '123', 'Mario' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'mario')
`;

const PORTFOLIO_SCHEMA = `
CREATE TABLE IF NOT EXISTS portfolio (
    portfolio_id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_create_date TIMESTAMP NOT NULL, 
    portfolio_description TEXT DEFAULT ('') NOT NULL, 
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

const PORTFOLIO_ITEM_SCHEMA = `
CREATE TABLE IF NOT EXISTS portfolio_item (
    item_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    item_quantity REAL,
    item_price REAL,
    portfolio_id INTEGER,
    stock_id INTEGER,

    FOREIGN KEY (portfolio_id) REFERENCES portfolio (portfolio_id) ON DELETE CASCADE,
    FOREIGN KEY(stock_id) REFERENCES stock(stock_id) ON DELETE CASCADE 
);
`;

const STOCK_SCHEMA = `
CREATE TABLE IF NOT EXISTS stock (
    stock_id INTEGER PRIMARY KEY AUTOINCREMENT,
    stock_code VARCHAR(10) NOT NULL UNIQUE, 
    stock_description VARCHAR(30) DEFAULT ('') NOT NULL, 
    stock_price REAL
)
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_USER_2);
  db.run(STOCK_SCHEMA);
  db.run(PORTFOLIO_SCHEMA);
  db.run(PORTFOLIO_ITEM_SCHEMA);

  db.each("SELECT * FROM user", (err, user) => {
    console.log("Users");
    console.log(user);
  });
});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
