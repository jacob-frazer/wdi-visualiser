import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class IndepVarSelector extends Component {

    updateSelection(selectedList) {
        let newlist = selectedList.map( item => {
            return this.props.indicators[item]
        })
        this.props.submit("indep_vars", newlist)
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the independant variables</div>

            <Multiselect
            options={Object.keys(this.props.indicators)}
            onSelect={this.updateSelection.bind(this)}
            onRemove={this.updateSelection.bind(this)}
            isObject={false}
            placeholder="Search Variables..."
            />
            <br/>
        </div>
        );
    }

}

export default IndepVarSelector