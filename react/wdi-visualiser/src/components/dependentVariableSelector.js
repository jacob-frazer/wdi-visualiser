import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class DepVarSelector extends Component {

    state = {}

    submitChoice = () => {
        // runs the function from above that we passed in - so the give the choice of param back to app to update selected
        // model parameters
        console.log(this.state)
        this.props.submit("dep_var", this.state.dep_vars_code)
    }

    updateSelection(selectedItem) {
        this.setState({
            "dep_vars_name": selectedItem, 
            "dep_vars_code": this.props.indicators[selectedItem] 
        }, this.submitChoice)   
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the <i>dependant</i> variable for the ML model.</div>
            <Multiselect
            options={Object.keys(this.props.indicators)}
            onSelect={this.updateSelection.bind(this)}
            onRemove={this.updateSelection.bind(this)}
            isObject={false}
            placeholder="Search Variables..."
            selectionLimit={1}
            />
        </div>
        );
    }
}

export default DepVarSelector;