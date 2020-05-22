import React, {Component} from 'react'
import { connect } from 'react-redux';

import { Multiselect } from 'multiselect-react-dropdown';

// actions
import { updateMLParams } from '../../actions/modelActions';

class IndepVarSelector extends Component {

    updateSelection(selectedList) {
        let newlist = selectedList.map( item => {
            return this.props.indicators[item]
        })
        this.props.updateMLParams("indep_vars", newlist)
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

const mapStateToProps = (state) => {
    return {
      indicators: state.mappings.mappings.indicators
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(IndepVarSelector);