import React, {Component} from 'react'
import { connect } from 'react-redux';

import { Multiselect } from 'multiselect-react-dropdown';

// actions
import { updateMLParams, mlTypeChange } from '../../actions/modelActions';

class MachineLearningTypeSelector extends Component {

    updateSelection(selectedItem) {
        // update the ml type (1st dispatch) then reset ml_specific params (2nd)
        this.props.updateMLParams("ml_type", this.props.ml_types[selectedItem])
        this.props.mlTypeChange()
    }

    render() {    
        return (
        <div id='main-area'>
            The current model type is: 
            <br/>
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
      mlTypeChange: () => dispatch(mlTypeChange())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MachineLearningTypeSelector)