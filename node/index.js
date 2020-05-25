const express = require('express');
const app = express();
const cors = require('cors');

const axios = require('axios')
const python_url = 'http://localhost:5000'

// the mappings of countries and indicators etc
const countries = require('./mappings/countryCodes.json')
const indicators = require('./mappings/indicatorCodes.json')
const mlTypes = require('./mappings/ml_types.json')

// reversed mappings
const revCountries = require('./mappings/countryCodes_reversed.json')
const revIndicators = require('./mappings/indicatorCodes_reversed.json')
const revMLTypes = require('./mappings/ml_types_reversed.json')

// set up connection to mongo db
var MongoClient = require('mongodb').MongoClient;
const mongoURI = "mongodb://localhost:27017/WDI";

// reference this object throughout the code rather than opening/closing connections repeatedly
// potentially issues with connect returning a promise?
const db_client = new MongoClient(mongoURI);
db_client.connect().then( ret => {
    // make the collections for each ml type (think table in database)
    db_client.db().createCollection('rf_regression')
    db_client.db().createCollection('lin_regression')
    db_client.db().createCollection('rf_classifier')
    db_client.db().createCollection('nn_classifier')
});

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

app.get('/revMappings', (req, res) => {
    // send the mappings to the web app
    res.send({
        revCountries,
        revIndicators,
        revMLTypes
    })
})

app.post('/mlSubmit', async (req, res) => {
    // Front end will post the ML details to this url - from which it will check database/send to python

    // something about non handled promises it doesnt like in here
    await db_client.db().collection(req.body.ml_type).findOne({
        dep_var: req.body.dep_var,
        indep_vars: {$all: req.body.indep_vars},
        countries: {$all:req.body.countries},
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        ml_specific: req.body.ml_specific
    }, function(err, results) {
        if (err) throw err;

        if (results !== null) {
            console.log("got a result from the database!")
            res.send(results)
        }
    })

    // redirect the request to the python backend to build the model
    let url = python_url + '/ml'

    axios.post(url, req.body)
    .then( (response) => {
        data = response.data
        
        let mongo_data = {
            ...req.body,
            ...data
        }

        // send the response data into mongodb -- into collection for specific ml type
        db_client.db().collection(mongo_data.type).insertOne(mongo_data, function(err, res) {
            if (err) throw err;
            console.log(mongo_data.type + " model added to collection");
        });

        res.send(mongo_data)
      })
    .catch((error) => {
        console.error(error)
        console.log("We hit an error see above")
        res.send(error)
      })
    }) 


function clean(obj) {
    // cleans the query objects to make sure they only have keys with querys in
    // then adds in special $all tags to indep_vars and countries if they're still here
    let propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (obj[propName] == null || obj[propName] == undefined || obj[propName].length === 0 ) {
        delete obj[propName];
        }
    }
    // delete ML specific if its empty
    if (Object.keys(obj['ml_specific']).length === 0) delete obj['ml_specific']

    // special cases
    if (obj.indep_vars !== undefined) {
        obj.indep_vars = {$all: obj.indep_vars}
    }

    if (obj.countries !== undefined) {
        obj.countries = {$all: obj.countries}
    }
    }

// listen for searches and return the results
app.post('/mlSearch', async (req, res) => {

    // weed out null/blank fields and search on whats left
    let query = req.body
    clean(query)

    await db_client.db().collection(req.body.ml_type).find(
        query
    ).limit(10).toArray( function(err, result) {
        if (err) throw err;

        // send results back
        res.send(result)
    })
})