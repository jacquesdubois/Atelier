const { Client } = require('pg');

const client = new Client();

client.connect()
    .then(() => console.log('Connected to PostgreSQL Database!'))
    .catch((err) => console.log(err))

module.exports = client;