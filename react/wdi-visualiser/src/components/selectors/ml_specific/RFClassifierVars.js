import React, {Component} from 'react'
import { connect } from 'react-redux';

// actions
import { updateMLParams } from '../../../actions/modelActions';

// component with the optional vars for random forest classifiers

class RFClassifierVars extends Component {

    state = {
        num_classes: 3,
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
        <div id='rfc-div'>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                Number of Classes 
                <input id='num_classes' type="number" value={this.state.num_classes} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <label>
                Max Tree Depth 
                <input id='tree_depth' type="number" value={this.state.tree_depth} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <input type="submit" value="Submit" />
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