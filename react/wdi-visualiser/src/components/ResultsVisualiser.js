import React, {Component} from 'react'

import { connect } from 'react-redux';

// actions (?)
import { showBuilder } from '../actions/displayActions'

import LinearRegressionVisualiser from './visualisers/LinearRegressionVisualiser'
import RFClassifierVisualiser from './visualisers/RFClassifierVisualiser'

import '../css/ResultsVisualiser.css'

class ResultsVisualiser extends Component {

    // conditionally render based on type of ML done
    renderSwitch(ml_type) {
        switch(ml_type) {
            case 'lin_regression':
                return <LinearRegressionVisualiser results={this.props.results}/>;

            case 'rf_classifier':
                return <RFClassifierVisualiser results={this.props.results}/>;

            default:
                return <div className="error-div">"There was an error in your ML model. Please build another."</div>;
        }
    }

    // render the results output once its received from backend - results passed in on props
    render() {    
        return (
        <div id='main-area'>
            {this.renderSwitch(this.props.ml_type)}
            <br/>
            <button className='btn-ml-back' onClick={this.props.showBuilder}>Take me back!</button>
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