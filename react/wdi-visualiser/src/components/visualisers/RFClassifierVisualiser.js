import React, {Component} from 'react'

class ResultsVisualiser extends Component {    

    // render the results for Random forest classification - results passed in on props
    // To do make a component to handle outputting the confusion matrix more nicely?
    render() {    

        // make the importances list/obj
        let importances = []
        for (let i=0; i < this.props.results["feature_importances"][0].length; i++) {
            importances.push(<div><strong>{this.props.results["feature_importances"][1][i]}</strong>: {this.props.results["feature_importances"][0][i]}</div>)
        }

        return (
        <div id='main-area'>
            <div className='visualiser-header'>You have made a Random Forest Classification Model</div>
            <br/>

            <div className='all-results-div'>
                {/* Make the two types of results divs go side by side */}
                <div className='numeric-results-div'>
                The prediction accuracy of the model is {this.props.results["accuracy"]} .
                </div>
                <br/>
                <div>
                    With the following confusion matrix:
                    {this.props.results["conf_matrix"].map((row, i) => (
                    <div key={i}>
                        {row.map((col, j) => (
                        <span key={j}>| {col} |</span>
                        ))}
                    </div>
                    ))}
                </div>
                
                <br/>
                <div>
                    The factors have the following importances:
                    {importances}
                </div>

                <div className='image-results-div'>
                {/* Put in the decoded image from the json file  --  have img_data be part of the results*/}
                <img src={`data:image/jpeg;base64,${this.props.results.img_data}`} />
                </div>
            </div>
        </div>
        );
    }
}

export default ResultsVisualiser;