import React, {Component} from 'react'
import { connect } from 'react-redux';

class ResultsVisualiser extends Component {    

    // render the results for linear regression - results passed in on props
    render() {    
        
            return (
            <div id='main-area'>
                <div className='visualiser-header'><h2>Neural Network Classification Model</h2></div>
                <br/>
    
                <div className='model-details'>
                <div className='model-details-vars-div'>
                    <h2>Variables</h2>
                    <i>Trying to predict</i> &nbsp; <br/> 
                    <strong>{this.props.indicator_mappings[this.props.results.dep_var]}</strong> 
                    <br/> <i>using</i> <br/> 
                    {this.props.results.indep_vars.map( (v) => (
                        <div>> {this.props.indicator_mappings[v]}, </div>
                    ))}
                </div>
    
                <div className='all-results-div'>
                    <h2>Results</h2>
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

                    <div>Other details about Neural Network Classification model in here</div>

                
                    <div className='image-results-div'>
                    {/* Put in the decoded image from the json file  --  have img_data be part of the results*/}
                    <img src={`data:image/jpeg;base64,${this.props.results.img_data}`} />
                    </div>
                </div>
    
                </div>
    
                <br/>
                <br/>
    
                <div className='model-details-other-div'> 
                    <i><h3>The full details of the dataset used can be seen below:</h3></i>
                    <div className='countries-div'>
                        <h3>Countries</h3>
                        {this.props.results.countries.map( (c) => (
                            <div>{this.props.country_mappings[c]}, </div>
                        ))}
                    </div>
                    <div className='years-div'>
                        <h3>Other details</h3>
                        <div>The data was sampled between the years of {this.props.results.start_year} and {this.props.results.end_year}.</div>
                        <br/><br/>
                        <div>
                            The model was built with the following non default parameters: <br/>
                            {Object.entries(this.props.results.ml_specific).map(([param, value]) => {
                                return <div>{param}: &nbsp; {value}</div>
                            })}
                        </div>
                    </div>
                </div>
    
            </div>
            );
        }
}

const mapStateToProps = (state) => {
    return {
        ml_mappings: state.mappings.reversed_mappings.ml_types,
        country_mappings: state.mappings.reversed_mappings.countries,
        indicator_mappings: state.mappings.reversed_mappings.indicators
      }
}

export default connect(mapStateToProps)(ResultsVisualiser);