const { Client } = require('pg');
// const env = require('../.env');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    // password: env.PGPASSWORD,
    port: process.env.PGPORT,
});

const dbConnection = client.connect()
    .then(() => console.log('Connected to PostgreSQL Database!'))
    .catch((err) => console.log(err))
    .finally(() => client.end());

module.exports = dbConnection;