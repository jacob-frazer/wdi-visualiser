import React, {Component} from 'react'

// import all the model specific var selections
import LinearRegressionVars from './ml_specific/LinearRegressionVars'
import RFClassifierVars from './ml_specific/RFClassifierVars'

class ModelSpecificSelector extends Component {
    constructor(props) {
        super(props);
    }

    state = {}

    componentDidUpdate(prevProps){
        if(prevProps.type !== this.props.type){
            this.setState({          
                type: this.props.type
            });
        }
    }

    updateSelection(selection) { 
        this.props.submit("ml_specific", selection)
    }

    // conditionally render based on type of ML done
    renderSwitch(ml_type) {
        switch(ml_type) {
            case 'lin_regression':
                return <LinearRegressionVars submit={this.updateSelection}/>;

            case 'rf_classifier':
                return <RFClassifierVars submit={this.updateSelection}/>;

            default:
                return <div className="error-div">No model type has been selected.</div>;
        }
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the ML specific values</div>
            {this.renderSwitch(this.state.type)}
            <br/>
        </div>
        );
    }
}

export default ModelSpecificSelector;