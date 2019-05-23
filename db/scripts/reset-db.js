const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

knex
