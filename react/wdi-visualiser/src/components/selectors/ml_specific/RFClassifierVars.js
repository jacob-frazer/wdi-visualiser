import React, {Component} from 'react'

// component with the optional vars for random forest classifiers

class RFClassifierVars extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        num_classes: 3,
        tree_depth: 2
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = (event) => {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        // send state up the chain to update 
        this.props.submit(this.state)
    }

    render() {    
        console.log(this.props)
        return (
        <div id='rfc-div'>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                Number of Classes 
                <input id='num_classes' type="text" value={this.state.num_classes} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <label>
                Max Tree Depth 
                <input id='tree_depth' type="text" value={this.state.tree_depth} onChange={this.handleChange.bind(this)} />        
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
        </div>
        );
    }
}

export default RFClassifierVars;