const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function getDataFromDB() {
  const { rows } = await pool.query('SELECT * FROM product LIMIT 500');
  return rows;
}

async function createDataInDB(count) {
  const insertQuery = `
    INSERT INTO product (name, description, price, stock)
    SELECT
      'Product ' || (i + (SELECT COALESCE(MAX(id), 0) FROM product)) AS name,
      'Description for product ' || (i + (SELECT COALESCE(MAX(id), 0) FROM product)) AS description,
      round((random() * 1000 + 100)::numeric, 2) AS price,
      (random() * 100)::int + 1 AS stock
    FROM generate_series(1, $1) AS s(i)
    RETURNING *;
  `;
  
  const { rows } = await pool.query(insertQuery, [count]);
  return rows;
}

async function deleteAllDataFromDB() {
  return await pool.query('DELETE FROM product');
}

async function countDataFromDB() {
  const result = await pool.query('SELECT COUNT(*) FROM product');
  return parseInt(result.rows[0].count);
}

module.exports = { getDataFromDB, createDataInDB, deleteAllDataFromDB, countDataFromDB };