const express = require('express');
const app = express();
const cors = require('cors');

const axios = require('axios')
const python_url = 'http://localhost:5000'

// the mappings of countries and indicators etc
const countries = require('./mappings/countryCodes.json')
const indicators = require('./mappings/indicatorCodes.json')
const mlTypes = require('./mappings/ml_types.json')

// set up connection to mongo db
var MongoClient = require('mongodb').MongoClient;
const mongoURI = "mongodb://localhost:27017/WDI";

// reference this object throughout the code rather than opening/closing connections repeatedly
// potentially issues with connect returning a promise?
const db_client = new MongoClient(mongoURI);
db_client.connect();


// setting up cors to allow cross origin requests etc
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.listen(4000, () => {
    console.log("Server running on port 4000")
})

app.get('/mappings', (req, res) => {
    // send the mappings to the web app
    res.send({
        countries,
        indicators,
        mlTypes
    })
})

app.post('/mlSubmit', (req, res) => {
    // Front end will post the ML details to this url - from which it will check database/send to python

    // TODO: check params against database and return if it already exists

    // redirect the request to the python backend to build the model
    let url = python_url + '/ml'

    axios.post(url, req.body)
    .then( (response) => {
        data = response.data

        // send the response data into mongodb
        db_client.db().collection("ML_models").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("ML model added to table");
        });

        res.send(data)
      })
    .catch((error) => {

        console.error(error)
        console.log("We hit an error see above")
        res.send(error)
      })
    }) 