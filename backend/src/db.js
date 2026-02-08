//import * as schema from './user.js'

const {drizzle} = require("drizzle-orm/node-postgres");
const {Pool} = require("pg");
const schema = require("./schema/index");

const pool = new Pool({
    connectionString: "postgres://bughunt:bughunt123@localhost5432/bughunt_db",
});

const db = drizzle(pool, { schema });

module.exports = db;