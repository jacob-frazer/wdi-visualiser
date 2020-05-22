import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showResults, showModelSearch, showBuilder } from '../actions/displayActions';

import '../css/Header.css'

class Header extends Component {

    render() {
      return (
        <div className='Header-component'>
            <div className='builderDiv' onClick={this.props.showBuilder}>Builder!</div>

            <div className='resultsDiv' onClick={this.props.showResults}>Results!</div>

            <div className='mlSearchDiv' onClick={this.props.showModelSearch}>Search!</div>
            
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      current_page: state.display.display
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      showModelSearch: () => dispatch(showModelSearch()),
      showResults: () => dispatch(showResults()),
      showBuilder: () => dispatch(showBuilder())
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(Header);