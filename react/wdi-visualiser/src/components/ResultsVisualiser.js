import React, {Component} from 'react'

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
            {this.renderSwitch(this.props.results.type)}
            <br/>
            <button className='btn-ml-back' onClick={this.props.reset}>Take me back!</button>
        </div>
        );
    }
}

export default ResultsVisualiser;