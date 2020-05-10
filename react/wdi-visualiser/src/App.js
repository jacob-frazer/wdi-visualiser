import React, { Component } from 'react';
import logo from './images/world_bank.png';
import './App.css';

import axios from 'axios'

import DependentVariableSelector from './components/dependentVariableSelector'

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
    name: "Jake",
    mappings_received: false
  };

  // get the data on the countries/variables/yrs etc
  componentDidMount() {
    this.fetchMappings();
  }

  fetchMappings() {
    axios.get('http://localhost:4000/mappings')
    .then( (response) => {
      this.setState({
        "countries": response.data.countries,
        "indicators": response.data.indicators,
        "ml_types": response.data.mlTypes,
        "mappings_received": true
      })
    })
  }

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

  updateMLParams = (target, value) => {
    // function to update the ML params in the state here
    this.setState({
      ml_params: {...this.state.ml_params, [target]: value}
    })
  }

  render() {
    // runs if the mappings haven't been loaded in yet
    return (
      <div className="App">
        <div className="Background">
        <header className="App-header">
          <img src={logo} className="wb-logo" alt="logo" />
          <p>
            Hi {this.state.name}!
            <br/>
            Welcome to ML builder of the World Development Index dataset
            <br/>
          </p>

            {this.state.mappings_received ?

            <div>
              <p>
              The current request that will be built is: 
              <br/>
              {this.state.ml_types[this.state.ml_params.ml_type]}
              </p>
    
              <DependentVariableSelector indicators={this.state.indicators} submit={this.updateMLParams}/>
    
              <br/>
              <p>When you're happy with your variable selections click the button below:</p>
              <br/>
              <button className='button' onClick={this.handleClick.bind(this)}>Generate Machine Learning Model!</button>
            </div> 
            :
              <p>Please wait whilst the mappings load... </p>
            }

        </header>
        </div>
      </div>
    )
  }
}

export default App;
