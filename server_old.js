const express = require("express");
var cookieParser = require('cookie-parser');
const Pool = require('pg').Pool
const cors = require("cors");

const db = require('./src/services/db');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};


// jh@n@_2021

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const pool = new Pool({
//   user: 'jhana',
//   host: 'localhost',
//   database: 'dilsa_db',
//   password: 'jh@n@_2021',
//   port: 5432,
// })

const getProductList = async (request, response) => {
  const {error, results } = await db.query('SELECT * FROM public.product ORDER BY id ASC')
  response.status(200).json(results.rows);
}

app.get('/products/', async function (req, res) {
  await res.send(getProductList(req, res));
});


// simple route

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});