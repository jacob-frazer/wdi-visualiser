const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

const test_data = { 
    "ml_type": "lin_regression", 
    "dep_var": "NY.ADJ.NNTY.CD", 
    "indep_vars": ["NY.ADJ.AEDU.GN.ZS", "SE.SEC.UNER.LO.ZS"],
    "countries": ["ARB", "UKR", "USA", "GBR", "BGR", "SPA", "NOR", "FRO", "MEX"],
    "start_year": 1990,
    "end_year": 2019
    }

app.get('/mlSubmit', (req, res) => {
    // Front end will post the ML details to this url - from which it will call the python ML to calculate it
    let spawn = require("child_process").spawn;

    // put the details from the post request about the ML model req.query.firstname
    var pythonProcess = spawn('python',["../python/ml_modeller.py", JSON.stringify(test_data)] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    pythonProcess.stdout.on('data', (data) => { 
        // return the data to front end to display
        data = data.toString('utf-8')

        res.send(JSON.parse(data))
    } ) 
})