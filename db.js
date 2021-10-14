const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dilsa_db',
  password: 'postgres',
  port: 5432,
})

const getProducts = (request, response) => {
    pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getProducts,
  }