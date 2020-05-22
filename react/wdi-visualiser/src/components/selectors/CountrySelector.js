import React, {Component} from 'react'
import { connect } from 'react-redux';

import { Multiselect } from 'multiselect-react-dropdown';
import Switch from 'react-switch';

// actions
import { updateMLParams } from '../../actions/modelActions';

class CountrySelector extends Component {

    state = {checked: false}

    updateSelection(selectedList) {
        let newlist = selectedList.map( item => {
            return this.props.countries[item]
        })
        this.props.updateMLParams("countries", newlist)
    }

    handleChangeChk = () => {
        this.setState({checked: !this.state.checked}, () => {
            this.state.checked ? 
            this.props.updateMLParams("countries", Object.values(this.props.countries)) 
            : 
            this.props.updateMLParams("countries", [])
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

const mapStateToProps = (state) => {
    return {
        countries: state.mappings.mappings.countries
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);