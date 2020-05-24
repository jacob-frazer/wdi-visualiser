import React, {Component} from 'react'

import { connect } from 'react-redux';

// actions (?)
import { showBuilder } from '../actions/displayActions'

import LinearRegressionVisualiser from './visualisers/LinearRegressionVisualiser'
import RFClassifierVisualiser from './visualisers/RFClassifierVisualiser'
import NNClassifierVisualiser from './visualisers/NNClassifierVisualiser'
import RFRegressionVisualiser from './visualisers/RFRegressionVisualiser'

import '../css/ResultsVisualiser.css'

class ResultsVisualiser extends Component {

    // conditionally render based on type of ML done
    renderSwitch(ml_type) {
        switch(ml_type) {
            case 'lin_regression':
                return <LinearRegressionVisualiser results={this.props.results}/>;

            case 'rf_classifier':
                return <RFClassifierVisualiser results={this.props.results}/>;

            case 'rf_regression':
                return <RFRegressionVisualiser results={this.props.results}/>;

            case 'nn_classifier':
                return <NNClassifierVisualiser results={this.props.results}/>;

            default:
                return <div className="error-div">You currently have no ML model selected. Either build or search for one!</div>;
        }
    }

    // render the results output once its received from backend - results passed in on props
    render() {    
        return (
        <div id='main-area'>
            <div className='header-space'/>
            {this.renderSwitch(this.props.ml_type)}
            <br/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      results: state.model.results,
      ml_type: state.model.type
    }
  }

// have a dispatch under like miscellaneous -> switch between builder and current results
const mapDispatchToProps = (dispatch) => {
    return {
      showBuilder: () => dispatch(showBuilder())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ResultsVisualiser);