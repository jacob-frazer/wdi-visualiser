import React, {Component} from 'react'

import { Multiselect } from 'multiselect-react-dropdown';
import Switch from 'react-switch';

class CountrySelector extends Component {

    state = {checked: false}

    updateSelection(selectedList) {
        let newlist = selectedList.map( item => {
            return this.props.countries[item]
        })
        this.props.submit("countries", newlist)
    }

    handleChangeChk = () => {
        this.setState({checked: !this.state.checked}, () => {
            this.state.checked ? 
            this.props.submit("countries", Object.values(this.props.countries)) 
            : 
            this.props.submit("countries", [])
            // reset the selection in the component
        })
    }

    render() {    
        return (
        <div className='CountrySelect'>
            <div className="header">Select the countries <small>- toggle switch for all</small></div>
            <Multiselect
            className="CountryMultiSelect"
            options={Object.keys(this.props.countries)}
            onSelect={this.updateSelection.bind(this)}
            onRemove={this.updateSelection.bind(this)}
            isObject={false}
            placeholder="Search Countries..."
            showCheckbox={true}
            />

            <Switch onChange={this.handleChangeChk} checked={this.state.checked} />

        </div>
        );
    }

}

export default CountrySelector