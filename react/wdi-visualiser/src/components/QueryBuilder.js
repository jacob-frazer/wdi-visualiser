import React, { Component } from 'react';
import logo from '../images/world_bank.png';
import '../css/QueryBuilder.css' 

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
import { updateMLParams, updateModel, waitingForML, notWaiting } from '../actions/modelActions';
import { showResults, showModelSearch } from '../actions/displayActions';
import { updateSearchResults } from '../actions/searchActions';

class QueryBuilder extends Component {

  // ask for their name and set it here?
  state = {
    name: "Jake",
  };

  handleBuildClick() {
    // wait for model to train
    this.props.waitingForML()
    axios.post('http://localhost:4000/mlSubmit', this.props.ml_params)
    .then( (response) => {
      // update state with model
      this.props.updateModel(response.data)
      this.props.notWaiting();

      // change display to visualiser
      this.props.showResults()
    }, (error) => {
        // TODO: set up how to handle errors
      console.log(error);
    });
  }

  handleSearchClick = () => {
    // wait for model to train
    this.props.waitingForML();
    axios.post('http://localhost:4000/mlSearch', this.props.ml_params)
    .then( (response) => {
      // update state with models
      this.props.updateSearchResults(response.data)
      this.props.notWaiting();

      // change display to search results
      this.props.showModelSearch()
    }, (error) => {
        // TODO: set up how to handle errors
      console.log(error);
    });
  }

  render() {
    // runs if the mappings haven't been loaded in yet
    return (
      <div className="QueryBuilder">
        <div className='header-space-builder'/>
        <header className="App-header">
          <img src={logo} className="wb-logo" alt="logo" />
          <p>
            Hi {this.state.name}!
            <br/>
            Welcome to ML builder of the World Development Index dataset, from here you can <br/>
            construct new ML models to be built or query the database of existing models!
            <br/>
          </p>

            {this.props.mappings_received ?
            
            <div>
              <div className="heightened-div-1">
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
              <ModelSpecificParamSelector type={this.props.ml_params.ml_type}/>
              <br/>
              <p>When you're happy with your variable selections click one of the buttons below:</p>
              { this.props.waiting_for_ml ? 
              <ReactLoading className="ml-loading" type="bubbles" height={'20%'} width={'20%'} />
              :
              <div className='submit-search-btns'>
              <button className='btn-ml-submit' onClick={this.handleBuildClick.bind(this)}>Generate Machine Learning Model!</button>
                &nbsp; &nbsp; or &nbsp; &nbsp;
              <button className='btn-ml-search-submit' onClick={this.handleSearchClick}>Search for Machine Learning Models!</button>
              </div>
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
    mappings_received: state.mappings.mappings_received,
    ml_params: state.model.ml_params,
    waiting_for_ml: state.model.waiting_for_ml,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    updateModel: (model) => dispatch(updateModel(model)),
    waitingForML: () => dispatch(waitingForML()),
    notWaiting: () => dispatch(notWaiting()),
    showResults: () => dispatch(showResults()),
    showModelSearch: () => dispatch(showModelSearch()),
    updateSearchResults: (results) => dispatch(updateSearchResults(results))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilder);
