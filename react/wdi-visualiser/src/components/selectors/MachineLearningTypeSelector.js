import React, {Component} from 'react'
import { connect } from 'react-redux';

import { Multiselect } from 'multiselect-react-dropdown';

// actions
import { updateMLParams } from '../../actions/modelActions';

class MachineLearningTypeSelector extends Component {

    updateSelection(selectedItem) {
        this.props.updateMLParams("ml_type", this.props.ml_types[selectedItem])
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

const mapStateToProps = (state) => {
    return {
      ml_types: state.mappings.mappings.ml_types
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningTypeSelector)