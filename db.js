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

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPromotions = (request, response) => {
    pool.query('SELECT * FROM promotion ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


async function authenticate({ email, password }) {
    const rawQuery = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
    const u = await pool.query(rawQuery, (error, results) => {
        if (error) {
            throw error;
        }
        const user = results.rows?.[0]; // this is an Array error
        
        if (user) {
            delete user.password;
            console.info('ser', user)
            return user;
        }
    })  
    console.log('u',u)
    return u;
}


module.exports = {
    getProducts,
    getUsers,
    getPromotions,
    authenticate
  }