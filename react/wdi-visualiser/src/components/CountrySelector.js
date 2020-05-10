import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';

class CountrySelector extends Component {

    updateSelection(selectedList) {
        let newlist = selectedList.map( item => {
            return this.props.countries[item]
        })
        this.props.submit("countries", newlist)
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the countries</div>

            <Multiselect
            options={Object.keys(this.props.countries)}
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

export default CountrySelector