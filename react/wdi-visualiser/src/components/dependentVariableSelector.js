import React, {Component} from 'react'

class depVarSelector extends Component {

    state = {}

    submitChoice = () => {
        // runs the function from above that we passed in - so the give the choice of param back to app to update selected
        // model parameters
        this.props.submit("dep_var", this.state.dep_var_code)
    }

    handleChange(event) {
        // lookup code from name
        this.setState({
            "dep_var_name": event.target.value,
            "dep_var_code": this.props.indicators[event.target.value]
        });
    }

    createSelectOptions() {
        return Object.keys(this.props.indicators).map( (c) => {
            return <option key={c} value={c}>{c}</option>;
        })
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the <i>dependant</i> variable for the ML model.</div>

            <select name="depVarSelector" size="10" value={this.state.dep_var_name} onChange={this.handleChange.bind(this)}>
                {this.createSelectOptions()}
            </select>

            <button className="button" type="submit" value="play" onClick={this.submitChoice}>Submit!</button>
        </div>
        );
    }
}

export default depVarSelector;