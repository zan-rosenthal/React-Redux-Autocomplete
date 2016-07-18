import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/actions';
import TweetBar from '../components/tweetBar'

class App extends Component {

  render() {
    const { tweet, results, highlightedIndex, actions } = this.props

    return (
        <div>
          <h1 id="title" className="centered" >Twitter Typeahead</h1>
          <TweetBar tweet={tweet} results={results} highlightedIndex={highlightedIndex} actions={actions}/>
        </div>
    );
  }
}

App.defaultProps ={
  tweet: '',
  results: [],
  highlightedIndex: -1,
  actions: {}
}

App.propTypes = {
  tweet: PropTypes.string,
  results: PropTypes.array.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}


const mapStateToProps = (state)=> {
  return {
    tweet: state.tweet,
    results: state.results,
    highlightedIndex: state.highlightedIndex
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
