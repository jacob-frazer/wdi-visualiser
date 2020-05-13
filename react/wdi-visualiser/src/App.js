import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import ResultsVisualiser from './components/ResultsVisualiser';
import QueryBuilder from './components/QueryBuilder';

class App extends Component {

  // for now bind our example to the state
  state = {
    mappings_received: false,
    waiting_for_ml: false,
    mappings: {}
  };

  // get the data on the countries/variables/yrs etc
  componentDidMount() {
    this.fetchMappings();
  }

  fetchMappings() {
    axios.get('http://localhost:4000/mappings')
    .then( (response) => {
      this.setState({
        mappings: {
          "countries": response.data.countries,
          "indicators": response.data.indicators,
          "ml_types": response.data.mlTypes
        }
      })
    })
  }

  updateModel = (model) => {
    // func that updates the current stored model that can be visualised. (Currently stored in state so 1 at a time)
    this.setState({
      model_details: model,
      model_received: true
    })
  }

  resetModel = () => {
    this.setState({
      model_received: false
    })
  }

  render() {
    // runs if the mappings haven't been loaded in yet
    return (
      <div className="App">
        <div className="Background"></div>
          {this.state.model_received ?
          <ResultsVisualiser results={this.state.model_details} reset={this.resetModel}/>
          :
          <QueryBuilder mappings={this.state.mappings} updateModel={this.updateModel}/>
          }
        <br/>
        <div className='footer-div'>App made by Jake Frazer</div>
        
      </div>
    )
  }
}

export default App;
