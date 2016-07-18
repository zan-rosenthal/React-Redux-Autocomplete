import React, { Component, PropTypes } from 'react';
import AutoCompleteItem from './autoCompleteItem'

class AutoCompleteResults extends Component {

  render() {
      let index = -1;
      const {highlightedIndex, results, updateTweet, setHighlight } = this.props;
      return (
        <ul id="autocomplete-dropdown" >
          {results.map((result) => {
            return <AutoCompleteItem
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

AutoCompleteResults.propTypes = { results: PropTypes.array };
AutoCompleteResults.defaultProps = { results: [] };

export default AutoCompleteResults;
