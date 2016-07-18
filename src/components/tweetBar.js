import React, { Component, PropTypes } from 'react';
import AutoCompleteResults from './autoCompleteResults';

class TweetBar extends Component {
  constructor(props) {
    super(props);
  }

  handleChange (e){
    let { updateTweet, fetchResults, updateResults } = this.props.actions;
    let inputValue = e.target.value;
    updateTweet(inputValue);
  }

  handleKeyDown(e){
    if (TweetBar.eventHandlers[e.key] && this.props.results.length) {
      TweetBar.eventHandlers[e.key].call(this, e);
    }
  }

  renderTypeAhead (){
    let { tweet, results, highlightedIndex, actions } = this.props;

    if (results && results.length > 0){
      return (<AutoCompleteResults
         results={results}
         highlightedIndex = {highlightedIndex}
         updateTweet={actions.updateTweet}
         setHighlight={actions.setHighlight}
      />)
    };
  }

  render(){


    return (
      <div id="compose" className="centered">
        <form>
          <textarea
              value={this.props.tweet}
              id="message-input"
              className="centered nice-corners "
              type="text"
              placeholder="Search..."
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
          />
        </form>
        {this.renderTypeAhead()}
        <div className="btn btn-primary">Send</div>
      </div>
    );
  }
}

TweetBar.defaultProps = {
   results: [],
   fetchResults: ()=>{}
}

TweetBar.propTypes = {
  results: PropTypes.array,
  fetchResults: PropTypes.func.isRequired
}

TweetBar.eventHandlers = {
  ArrowDown:function(e) {
    e.preventDefault();
    let { highlightedIndex, actions } = this.props;
    actions.setHighlight(highlightedIndex+1);
  },

  ArrowUp: function (e) {
    e.preventDefault();
    let { highlightedIndex, actions } = this.props;
    actions.setHighlight(highlightedIndex-1);
  },

  Enter: function (e) {
    e.preventDefault();
    let {tweet, results, highlightedIndex, actions } = this.props;
    actions.updateTweet(tweet, results[highlightedIndex]);
  }
};

export default TweetBar;
