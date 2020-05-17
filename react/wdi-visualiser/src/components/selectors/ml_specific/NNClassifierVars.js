import React, {Component} from 'react'
import { connect } from 'react-redux';

// actions
import { updateMLParams } from '../../../actions/modelActions';

// component with the optional vars for random forest classifiers

class RFClassifierVars extends Component {

    state = {
        num_classes: 3,
        hidden_layers: 2,
        nodes_hidden_layers: 5
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
                Number of Classes 
                <input id='num_classes' type="number" value={this.state.num_classes} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <label>
                Hidden Layers 
                <input id='tree_depth' type="number" value={this.state.hidden_layers} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <label>
                Nodes in the hidden layers 
                <input id='tree_depth' type="number" value={this.state.nodes_hidden_layers} onChange={this.handleChange.bind(this)} />        
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