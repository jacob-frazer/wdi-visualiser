import React, {Component} from 'react'


class ResultsVisualiser extends Component {

    // render the results for linear regression - results passed in on props
    render() {    
        return (
        <div id='main-area'>
            <div className='visualiser-header'>You have made a Linear Regression Model</div>
            <br/>

            The R squared value of the model is {this.props.results["R Squared"]} .
            <br/>
        </div>
        );
    }
}

export default ResultsVisualiser;