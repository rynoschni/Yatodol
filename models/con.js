const host = "lallah.db.elephantsql.com";
const database = "dowrvqwu";
const user = "dowrvqwu";
const password = "2pH1MBwJhepwUbrzvAvZIApb7dVd-qT5";

const pgp = require('pg-promise')({
    query: function (event) {
        console.log("QUERY:", event.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password,
}

const db = pgp(options);

module.exports = db;
