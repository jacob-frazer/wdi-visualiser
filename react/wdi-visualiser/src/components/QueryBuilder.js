import React, { Component } from 'react';
import logo from '../images/world_bank.png';

import axios from 'axios'

import { connect } from 'react-redux';

import MachineLearningTypeSelector from './selectors/MachineLearningTypeSelector'
import DependentVariableSelector from './selectors/DependentVariableSelector'
import IndependentVariableSelector from './selectors/IndependentVariableSelector'
import CountrySelector from './selectors/CountrySelector'
import YearSelector from './selectors/YearSelector'
import ModelSpecificParamSelector from './selectors/ModelSpecificParamSelector'

import ReactLoading from 'react-loading'

// actions
import { updateMLParams, updateModel, waitingForML } from '../actions/modelActions';
import { showResults } from '../actions/displayActions';

class QueryBuilder extends Component {

  // for now bind our example to the state
  state = {
    ml_params: {
      "ml_type": "", 
      "dep_var": "NY.ADJ.NNTY.CD", 
      "indep_vars": ["NY.ADJ.AEDU.GN.ZS", "SE.SEC.UNER.LO.ZS"],
      "countries": ["ARB", "UKR", "USA", "GBR", "BGR", "SPA", "NOR", "FRO", "MEX"],
      "start_year": 1980,
      "end_year": 2010,
      "ml_specific": {} 
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
    // wait for model to train
    this.props.waitingForML()
    axios.post('http://localhost:4000/mlSubmit', this.props.ml_params)
    .then( (response) => {
      // updates state with the model we received then calls func passed in from above to update and show visualiser
      this.setState({
        "model_details": response.data,
        "waiting_for_ml": false
      })
      // update state with model
      this.props.updateModel(response.data)
      
      // change display to visualiser
      this.props.showResults()
    }, (error) => {
        // TODO: set up how to handle errors
      console.log(error);
      this.setState({
        "waiting_for_ml": false
      })
    });
  }

  updateMLParams = (target, value) => {
    // function to update the ML params in the state here
    this.setState({
      ml_params: {...this.state.ml_params, [target]: value}
    })

    // if changing ml type then reset the ml specific params
    if (target === "ml_type") {
      this.setState({
        ml_params: {...this.state.ml_params, "ml_specific": {}, [target]: value }
      })
    }
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

            {this.props.mappings_received ?
            
            <div>
              <div className="heightened-div-1">
              The current model that will be built is: 
              <br/>
              <MachineLearningTypeSelector/>
              </div>
    
              <div className="heightened-div-2">
              <DependentVariableSelector/>
              </div>
              <div className="heightened-div-3">
              <IndependentVariableSelector/>
              </div>
              <CountrySelector/>
              <br/>
              <YearSelector/>
              <br/>
              <ModelSpecificParamSelector type={this.state.ml_params.ml_type} submit={this.updateMLParams}/>
              <br/>
              <p>When you're happy with your variable selections click the button below:</p>
              { this.props.waiting_for_ml ? 
              <ReactLoading className="ml-loading" type="bubbles" height={'20%'} width={'20%'} />
              :
              <button className='btn-ml-submit' onClick={this.handleClick.bind(this)}>Generate Machine Learning Model!</button>
              }
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

const mapStateToProps = (state) => {
  return {
    mappings: state.mappings.mappings,
    mappings_received: state.mappings.mappings_received,
    ml_params: state.model.ml_params,
    waiting_for_ml: state.model.waiting_for_ml
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    updateModel: (model) => dispatch(updateModel(model)),
    waitingForML: () => dispatch(waitingForML()),
    showResults: () => dispatch(showResults())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilder);
