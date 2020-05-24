import React, { Component } from 'react';
import '../css/Searcher.css' 

import { connect } from 'react-redux';

// actions
import { updateModel } from '../actions/modelActions';
import { showResults } from '../actions/displayActions';


class Searcher extends Component {

  // do I need/want any internal state?
  state = {
    
  };

  handleClick = (model) => {
    // on click on model make that model the active one so can be explored more closely
    this.props.updateModel(model)
    this.props.showResults()
  }

  resultsPreview = (type, model) => {
      /* 
      function to conditionally render the results preview (Single most interesting result)
      based on the type of ML it was
      */
      switch (type) {

        case "lin_regression":
            return <div>R^2 of: {model['R Squared'].toFixed(3)}</div>

        default:
            return <div></div>
      }     
  }


  render() {
    // renders all the found models (max 10)
    return (
      <div className="Searcher">
        <div className='header-space'/>
        
        These are the search results for:  <br/>
        ML Type: {this.props.ml_mappings[this.props.query.ml_type]},
        Dependent Variable: {this.props.indicator_mappings[this.props.query.dep_var]}

        <br/>
        <br/>
        Select a model from your search and then go to the results tab to view it more closely.
        <br/>
        <br/>

        {/* 
        TODO: make it display whatever info WASNT included in the query
        */}
        <div>
            
            {this.props.search_results.map((model) => (
                <div className='search-model' key={model._id} onClick={() => this.handleClick(model)}>
                    Model with data from {model.countries.length} countries over {model.end_year - model.start_year} years. <br/>
                    <br/>

                    The independent variables are: {model.indep_vars.map( (val) => (<div>{this.props.indicator_mappings[val]}, </div>))}  <br/>
                    
                    {this.resultsPreview(this.props.query.ml_type, model)}
                </div>
            ))}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search_results: state.search.results,
    query: state.model.ml_params,
    ml_mappings: state.mappings.reversed_mappings.ml_types,
    country_mappings: state.mappings.reversed_mappings.countries,
    indicator_mappings: state.mappings.reversed_mappings.indicators
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateModel: (model) => dispatch(updateModel(model)),
    showResults: () => dispatch(showResults())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
