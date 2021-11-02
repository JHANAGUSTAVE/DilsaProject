const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dilsa_db',
  password: 'postgres',
  port: 5432,
});

require("dotenv").config();
const verifyToken = require("./auth");

const app = express()
const port = process.env.PORT || 3001

const GMAIL_USER = process.env.GMAIL_USER || 'tf@fdree.co'
const GMAIL_PASS = process.env.GMAIL_PASS || 'aawaaw'

var corsOptions = {
  origin: "http://localhost:8080"
};


app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

function authenticate(req, res, next) {
  const { email, password } = req.body;
  const rawQuery = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
  const u = pool.query(rawQuery, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'error' });
    }
    const user = results.rows?.[0]; // this is an Array error
    
    if (user) {
        delete user.password;

        // Create token
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "8h",
          }
        );
        // save user token
        user.token = token;

        res.json(user);
    }else{
      res.status(400).json({ message: 'Email or password is incorrect' })
    }
  }) 
}

//app.use("/", authRouter);

app.post('/login', authenticate)

app.post('/login2', (req, res) => {
  res.json(
    {
      user: {
        firstName:'Jhana',
        lastName: "Gustave",
        email:"example@mail.com",
        photo:'path/to/photo.jpg',
        token:'zxcvbnefght53hbxc006bcc12fsdgfsdsdf',
      }
    }
  );
})

app.post('/contact', (req, res) => {

  console.log(req)
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  })

    const mailOpts = {
      from: 'Your sender info here', 
      to: GMAIL_USER,
      subject: 'New message from contact form at tylerkrys.ca',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }
  
   
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.json('contact-failure')
      }
      else {
        res.json('contact-success') 
      }
    })
  })

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/products', verifyToken ,db.getProducts)

app.get('/promotions', verifyToken ,db.getPromotions)

app.get('/users', verifyToken ,db.getUsers)

// app.post('/createUsers', verifyToken ,db.CreateUsers)

app.get('/public-products', db.getProducts)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

