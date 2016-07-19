import React, { Component, PropTypes } from 'react';
import TypeAheadMenu from './typeAheadMenu';
import Skylight from 'react-skylight';

class ComposeTweet extends Component {
  constructor(props) {
    super(props)
  }

  handleChange (event){
    let inputValue = event.target.value;
    this.props.actions.updateTweet(inputValue);
  }


  handleKeyDown(event){
    if (ComposeTweet.eventHandlers[event.key] && this.props.results.length > 0) {
      ComposeTweet.eventHandlers[event.key].call(this, event);
    }
  }

  handleSubmit(){
    let { updateTweet, updateResults } = this.props.actions;
    // updateTweet('');
    // updateResults([]);
    this.refs.modal.show();
    setTimeout(this.closeDialog.bind(this), 3000)
  }

  closeDialog(){
    this.refs.modal.hide();
  }

  render(){
    let { tweet, results, highlightedIndex, actions } = this.props;
    return (
      <div id="compose" className="centered">
        <form>
          <textarea
              id="message-input"
              className="centered"
              type="text"
              placeholder="Type your message..."
              value={tweet}
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
          />
          <TypeAheadMenu
             results={results}
             highlightedIndex = {highlightedIndex}
             updateTweet={actions.updateTweet}
             setHighlight={actions.setHighlight}
          />
        </form>
        <div className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Send</div>
        <Skylight hideOnOverlayClicked ref="modal">
            <h1 className="modal"> Your message has been sent! </h1>
        </Skylight>
      </div>
    );
  }
}


ComposeTweet.defaultProps ={
  tweet: '',
  results: [],
  highlightedIndex: -1,
  actions: {}
}

ComposeTweet.propTypes = {
  tweet: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

//Handles typeahead menu navigation and selecting
//twitter handle via keyboard
ComposeTweet.eventHandlers = {
  ArrowDown:function(event) {
    event.preventDefault();
    let { highlightedIndex, actions } = this.props;
    actions.setHighlight(highlightedIndex+1);
  },

  ArrowUp: function (event) {
    event.preventDefault();
    let { highlightedIndex, actions } = this.props;
    actions.setHighlight(highlightedIndex-1);
  },

  Enter: function (event) {
    event.preventDefault();

    let {tweet, results, highlightedIndex, actions } = this.props;
    // if(results.length > 0){
      actions.updateTweet(tweet, results[highlightedIndex]);
    // }else{
    //   this.handleSubmit();
    // }
  }
};

export default ComposeTweet;
