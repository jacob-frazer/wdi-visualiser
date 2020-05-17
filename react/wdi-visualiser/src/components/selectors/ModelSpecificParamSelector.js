import React, {Component} from 'react'

// import all the model specific var selections
import LinearRegressionVars from './ml_specific/LinearRegressionVars'
import RFClassifierVars from './ml_specific/RFClassifierVars'

class ModelSpecificSelector extends Component {

    // conditionally render based on type of ML done
    renderSwitch(ml_type) {
        switch(ml_type) {
            case 'lin_regression':
                return <LinearRegressionVars/>;

            case 'rf_classifier':
                return <RFClassifierVars/>;

            default:
                return <div className="error-div">No model type has been selected.</div>;
        }
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the ML specific values</div>
            {this.renderSwitch(this.props.type)}
            <br/>
        </div>
        );
    }
}

export default ModelSpecificSelector;