import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class MachineLearningTypeSelector extends Component {

    updateSelection(selectedItem) {
        this.props.submit("ml_type", this.props.ml_types[selectedItem])
    }

    render() {    
        return (
        <div id='main-area'>
            <Multiselect
            options={Object.keys(this.props.ml_types)}
            onSelect={this.updateSelection.bind(this)}
            onRemove={this.updateSelection.bind(this)}
            isObject={false}
            placeholder="Select ML technique..."
            singleSelect={true}
            />
            <br/>
        </div>
        );
    }
}

export default MachineLearningTypeSelector