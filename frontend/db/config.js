const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Rahul99pg",
    database: "hotelapp",
    port: 5432,
});

module.exports = pool;
