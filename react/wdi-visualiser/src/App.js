import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import { connect } from 'react-redux';

import ResultsVisualiser from './components/ResultsVisualiser';
import QueryBuilder from './components/QueryBuilder';

// actions
import { addMappings, waitingMappings } from './actions/mappingActions';

class App extends Component {

  // get the data on the countries/variables/yrs etc
  componentDidMount() {
    this.fetchMappings();
  }

  fetchMappings() {
    this.props.waitingMappings()
    axios.get('http://localhost:4000/mappings')
    .then( (response) => {
      // dispatch the action to update mappings into store
      this.props.addMappings({
        "countries": response.data.countries,
        "indicators": response.data.indicators,
        "ml_types": response.data.mlTypes
      })
    })
  }

  // conditionally render -- change this so we can just tab between them or something?
  renderSwitch(display) {
    switch(display) {
        case 'query':
            return <QueryBuilder/>;

        case 'results':
            return <ResultsVisualiser/>;

        default:
            return <div className="error-div">"There was an error displaying this page."</div>;
    }
}

  render() {
    // runs if the mappings haven't been loaded in yet
    return (
      <div className="App">
        <div className="Background"></div>
          {this.renderSwitch(this.props.display)}
        <br/>
        <div className='footer-div'>App made by Jake Frazer</div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mappings: state.mappings.mappings,
    mappings_received: state.mappings.mappings_received,
    model_received: state.model.model_received,
    display: state.display.display
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMappings: (mappings) => dispatch(addMappings(mappings)),
    waitingMappings: () => dispatch(waitingMappings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
