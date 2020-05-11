const express = require('express');
const app = express();
const cors = require('cors');

// the mappings of countries and indicators etc
const countries = require('./mappings/countryCodes.json')
const indicators = require('./mappings/indicatorCodes.json')
const mlTypes = require('./mappings/ml_types.json')

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
    // Front end will post the ML details to this url - from which it will call the python ML to calculate it
    let spawn = require("child_process").spawn;

    console.log("The request we received from the front end is:")
    console.log(req.body)

    // put the details from the post request about the ML model req.query.firstname
    var pythonProcess = spawn('python',["../python/ml_modeller.py", JSON.stringify(req.body)] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    pythonProcess.stdout.on('data', (data) => { 
        // return the data to front end to display
        data = data.toString('utf-8')
        console.log("the data is:")
        console.log(data)
        res.send(JSON.parse(data))
    } ) 
})