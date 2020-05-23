import React, { Component } from 'react';
import '../css/Searcher.css' 

import { connect } from 'react-redux';

// actions
import { updateModel } from '../actions/modelActions';


class Searcher extends Component {

  // do I need/want any internal state?
  state = {
    
  };

  handleClick = (model) => {
    // on click on model make that model the active one so can be explored more closely
    this.props.updateModel(model)
  }

  render() {
    // renders all the found models (max 10)
    return (
      <div className="Searcher">
        <div className='header-space'/>
        
        Yo this is the searcher!  <br/>
        Select a model from your search and then go to the results tab to view it more closely.
        <br/>
        <br/>

        {/* 
        Map over the search results and make each a cute little div -- put 3 to a line or something?
        Make this into its own mini component to display the boxes nicely?
        */}
        <div>
            {this.props.search_results.map((model) => (
                <div className='search-model' onClick={() => this.handleClick(model)}>
                    Model with id: {model._id}. R^2 of: {model['R Squared']}
                </div>
            ))}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search_results: state.search.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateModel: (model) => dispatch(updateModel(model))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
