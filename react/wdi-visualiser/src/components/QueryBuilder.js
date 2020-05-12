import React, { Component } from 'react';
import logo from '../images/world_bank.png';

import axios from 'axios'

import MachineLearningTypeSelector from './MachineLearningTypeSelector'
import DependentVariableSelector from './DependentVariableSelector'
import IndependentVariableSelector from './IndependentVariableSelector'
import CountrySelector from './CountrySelector'
import YearSelector from './YearSelector'

import ReactLoading from 'react-loading'

class QueryBuilder extends Component {

  // for now bind our example to the state
  state = {
    ml_params: {
      "ml_type": "lin_regression", 
      "dep_var": "NY.ADJ.NNTY.CD", 
      "indep_vars": ["NY.ADJ.AEDU.GN.ZS", "SE.SEC.UNER.LO.ZS"],
      "countries": ["ARB", "UKR", "USA", "GBR", "BGR", "SPA", "NOR", "FRO", "MEX"],
      "start_year": 1980,
      "end_year": 2010 
    },
    name: "Jake",
    mappings: this.props.mappings,
    waiting_for_ml: false
  };

  // get the data on the countries/variables/yrs etc
  componentDidMount() {
  }

  componentDidUpdate(oldProps) {
    let newProps = this.props
    if(oldProps.mappings !== newProps.mappings) {
      this.setState({ mappings: newProps.mappings })
    }
  }

  handleClick() {
    this.setState({"waiting_for_ml":true})
    axios.post('http://localhost:4000/mlSubmit', this.state.ml_params)
    .then( (response) => {
      // updates state with the model we received then calls func passed in from above to update and show visualiser
      this.setState({
        "model_details": response.data,
        "waiting_for_ml": false
      })
      console.log(this.state)
      this.props.updateModel(this.state.model_details)
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
      <div className="QueryBuilder">
        <header className="App-header">
          <img src={logo} className="wb-logo" alt="logo" />
          <p>
            Hi {this.state.name}!
            <br/>
            Welcome to ML builder of the World Development Index dataset
            <br/>
          </p>

            {Object.keys(this.state.mappings).length ?
            
            <div>
              <div className="heightened-div-1">
              The current model that will be built is: 
              <br/>
              <MachineLearningTypeSelector ml_types={this.state.mappings.ml_types} submit={this.updateMLParams}/>
              </div>
    
              <div className="heightened-div-2">
              <DependentVariableSelector indicators={this.state.mappings.indicators} submit={this.updateMLParams}/>
              </div>
              <div className="heightened-div-3">
              <IndependentVariableSelector indicators={this.state.mappings.indicators} submit={this.updateMLParams}/>
              </div>
              <CountrySelector countries={this.state.mappings.countries} submit={this.updateMLParams}/>
              <br/>
              <YearSelector submit={this.updateMLParams}/>
              <br/>
              <p>When you're happy with your variable selections click the button below:</p>
              { this.state.waiting_for_ml ? 
              <ReactLoading className="ml-loading" type="bubbles" height={'20%'} width={'20%'} />
              :
              <button className='btn-ml-submit' onClick={this.handleClick.bind(this)}>Generate Machine Learning Model!</button>
              }
              <br/>
              <div className='footer-div'>App made by Jake Frazer</div>
            </div> 
            :
            // this is what the page will show whilst the mappings are being loaded
              <p>Please wait whilst the data loads... </p>
            }

        </header>
      </div>
    )
  }
}

export default QueryBuilder;
