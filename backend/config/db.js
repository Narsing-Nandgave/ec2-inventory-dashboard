
const dotenv = require("dotenv")
dotenv.config();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DB_URL
});


pool.connect()
  .then((client) => {
    console.log('Database connected successfully!');
    client.release()
  })
  .catch((err) => {
    console.error('Unexpected database error:', err);
  })


module.exports = pool;
