import React, { Component, PropTypes } from 'react';
import TypeAheadItem from './typeAheadItem'

class TypeAheadMenu extends Component {

  render() {
      let index = -1;
      const {highlightedIndex, results, updateTweet, setHighlight } = this.props;
      return (
        <ul id="typeahead-menu" >
          {results.map(result => {
            return <TypeAheadItem
                     index={index+=1}
                     key={result.id}
                     user={result}
                     highlightedIndex={highlightedIndex}
                     updateTweet={updateTweet}
                     setHighlight={setHighlight}/>
          }).splice(0, 5)}
        </ul>
     );
  }
}

TypeAheadMenu.propTypes = {
  results: PropTypes.array,
  highlightedIndex: PropTypes.number,
  updateTweet:PropTypes.func,
  setHighlight: PropTypes.func
};

export default TypeAheadMenu;
