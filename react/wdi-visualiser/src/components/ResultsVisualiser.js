import React, {Component} from 'react'

import LinearRegressionVisualiser from './LinearRegressionVisualiser'

class ResultsVisualiser extends Component {

    updateSelection(selectedItem) { 
        this.props.submit("dep_var", this.props.indicators[selectedItem])
    }

    // conditionally render based on type of ML done
    //TODO:

    // render the results output once its received from backend - results passed in on props
    render() {    
        return (
        <div id='main-area'>
            {console.log(this.props.results)}
            The R squared value of the model is {this.props.results["R Squared"]} .
            <br/>
        </div>
        );
    }
}

export default ResultsVisualiser;