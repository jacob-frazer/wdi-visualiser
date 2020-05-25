import React, {Component} from 'react'
import { connect } from 'react-redux';

// actions
import { updateMLParams } from '../../../actions/modelActions';

// component with the optional vars for random forest classifiers

class RFClassifierVars extends Component {

    state = {
        num_trees: 15,
        tree_depth: 2
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]: parseInt(event.target.value)});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // remap state to have integers not strings
        this.props.updateMLParams("ml_specific", this.state)
    }

    render() {    
        console.log(this.props)
        return (
        <div id='ml-specific-div'>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                Number of Trees &nbsp;&nbsp;&nbsp;&nbsp;
                <input id='num_classes' type="number" value={this.state.num_trees} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <label>
                Max Tree Depth &nbsp;&nbsp;&nbsp;&nbsp;
                <input id='tree_depth' type="number" value={this.state.tree_depth} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <br/>
                <input className='ml-specific-submit' type="submit" value="Lock in values" />
            </form>
            <br/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      blank: 1
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RFClassifierVars);