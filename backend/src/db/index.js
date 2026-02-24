require('dotenv').config();
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

const pool = new Pool({
    connectionString: process.env.DB_URL || "postgres://bughunt:bughunt123@localhost:5432/bughunt_db",
});


const db = drizzle(pool, { schema });

module.exports = {db};