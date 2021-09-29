const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/products/", (req, res) => {
  res.json({
    "products":[
      {
        "id":1,
        "name":"Moteur",
        "description":""
      },
      {
        "id":2,
        "name":"Hood",
        "description":""
      }
    ]
  });
});

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});