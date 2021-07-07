const sqlite3 = require('sqlite3').verbose();

const searchTrades = async (req, res) => {
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    let sql = `SELECT * FROM trades ORDER BY id`;
    try {
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(500).send(`Couldn't fetch the response from Database. ${err}`);
            }
            if (rows) {
                res.status(200).send(rows);
            }
        });
        db.close();
        return;
    } catch (err) {
        db.close();
        res.status(503).send(`Couldn't fetch the response from Database. Api failed. ${err}`);
    }
    return;
};

const searchTradesByParam = async (req, res) => {
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    let sql = `SELECT * FROM trades ORDER BY id WHERE ` + req.searchparams.join(" WHERE ");
    try {
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(500).send(`Couldn't fetch the response from Database. ${err}`);
            }
            if (rows) {
                res.status(200).send(rows);
            }
        });
        db.close();
        return;
    } catch (err) {
        db.close();
        res.status(503).send(`Couldn't fetch the response from Database. Api failed. ${err}`);
    }
    return;
};

const addTrades = async (req, res) => {
    let db = await new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    try {
        await db.run('CREATE TABLE IF NOT EXISTS `trades` (`type` TEXT, `user_id` NUMBER, `symbol` TEXT, `shares` NUMBER, `price` NUMBER, `timestamp` BIGINT, `id` INTEGER PRIMARY KEY AUTOINCREMENT)');
        db.run(`INSERT INTO trades(type, user_id, symbol, shares, price, timestamp) VALUES(?, ?, ?, ?, ?, ?)`,
        await     [req.body.type, req.body.user_id, req.body.symbol, req.body.shares, req.body.price, req.body.timestamp], function (err, row) {
                if (err) {
                    res.status(500).send(`Couldn't insert data into Database. ${err}`);
                    db.close();
                    return;
                }
                if (row) {
                    res.status(201).send(row);
                    db.close();
                    return;
                }
    });
    } catch (err) {
        res.status(503).send(`Couldn't insert data into Database. Api Failed. ${err}`);
        db.close();
    }
};

const modifyExistingTrades = (req, res) => {
    res.status(405).send('The response code is 405 and there are no particular requirements for the response body.');
    return;
};

module.exports = {
    searchTrades,
    searchTradesByParam,
    addTrades,
    modifyExistingTrades
};