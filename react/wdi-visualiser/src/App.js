import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'

class App extends Component {

  // for now bind our example to the state
  state = {
    ml_params: {
      "ml_type": "lin_regression", 
      "dep_var": "NY.ADJ.NNTY.CD", 
      "indep_vars": ["NY.ADJ.AEDU.GN.ZS", "SE.SEC.UNER.LO.ZS"],
      "countries": ["ARB", "UKR", "USA", "GBR", "BGR", "SPA", "NOR", "FRO", "MEX"],
      "start_year": 1990,
      "end_year": 2019 
    },
    name: "Jake"
  };

  handleClick () {
    axios.post('http://localhost:4000/mlSubmit', this.state.ml_params)
    .then( (response) => {
      console.log("Updating state to reflect the model we just received");
      this.setState({
        "model_received": true,
        "model_details": response.data
      })
      console.log(this.state)
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to ML builder of the World Development Index dataset
          </p>
          <p>
            The current request that will be built is: 
            <br/>
            {this.state.ml_params.ml_type}
          </p>
          <button className='button' onClick={this.handleClick.bind(this)}>Generate Machine Learning Model!</button>

        </header>
      </div>
    );
  }
}

export default App;
