import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class DepVarSelector extends Component {

    updateSelection(selectedItem) { 
        this.props.submit("dep_var", this.props.indicators[selectedItem])
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the <i>dependant</i> variable</div>
            <Multiselect
            options={Object.keys(this.props.indicators)}
            onSelect={this.updateSelection.bind(this)}
            onRemove={this.updateSelection.bind(this)}
            isObject={false}
            placeholder="Search Variables..."
            selectionLimit={1}
            />
            <br/>
        </div>
        );
    }
}

export default DepVarSelector;