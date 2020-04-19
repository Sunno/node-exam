const env = require('dotenv').config();
module.exports = {
  host: env.parsed.DATABASE_HOST,
  user: env.parsed.DATABASE_USER,
  password: env.parsed.DATABASE_PASSWORD,
  database: env.parsed.DATABASE_NAME
}