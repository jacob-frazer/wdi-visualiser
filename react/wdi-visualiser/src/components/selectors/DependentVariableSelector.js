import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Multiselect } from 'multiselect-react-dropdown';

// actions
import { updateMLParams } from '../../actions/modelActions';

class DepVarSelector extends Component {

    updateSelection(selectedItem) { 
        this.props.updateMLParams("dep_var", this.props.indicators[selectedItem])
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


export default connect(mapStateToProps, mapDispatchToProps)(DepVarSelector);