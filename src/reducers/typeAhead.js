import * as types from '../actions/actionTypes';

const initialState = {
  tweet: '',
  results: [],
  highlightedIndex: 0
};

function typeAhead(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_TWEET:
      return {
        ...state,
        tweet: action.tweet,
      };
    case types.UPDATE_RESULTS:
      return {
        ...state,
        results: action.results
      };
    case types.SET_HIGHLIGHT:
      return {
        ...state,
        highlightedIndex: action.index
    };
    default:
      return state;
    }
}

export default typeAhead;
