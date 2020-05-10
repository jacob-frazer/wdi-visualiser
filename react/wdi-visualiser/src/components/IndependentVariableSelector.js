import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class IndepVarSelector extends Component {

    state = {"indep_vars": []}

    submitChoice = () => {
        this.props.submit("indep_vars", this.state.indep_vars)
    }

    onSelect(selectedList, selectedItem) {
        let newlist = selectedList.map( item => {
            return this.props.indicators[item]
        })
        this.setState({"indep_vars": newlist}, this.submitChoice)   
    }

    onRemove(selectedList, selectedItem) {
        let newlist = selectedList.map( item => {
            return this.props.indicators[item]
        })
        this.setState({"indep_vars": newlist}, this.submitChoice)
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the independant variables for the ML model.</div>

            <Multiselect
            options={Object.keys(this.props.indicators)}
            onSelect={this.onSelect.bind(this)}
            onRemove={this.onRemove.bind(this)}
            isObject={false}
            placeholder="Search Variables..."
            />

        </div>
        );
    }

}

export default IndepVarSelector