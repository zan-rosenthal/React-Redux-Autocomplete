import * as types from '../actions/actionTypes.js'
import { updateResults, fetchResults } from '../actions/actions.js'

//Routes updates to the tweet input
//If user selected from autosuggest dropdown, it autocompletes the handle
//Otherwise, it checks whether or not to update suggestions
export const checkTweet = store => next => action => {
  if (action.type === types.UPDATE_TWEET){
    if (action.user){
      let tweet = action.tweet || store.getState().tweet;
      let user = action.user;
      action.tweet = autoComplete(tweet, user);
      store.dispatch(updateResults([]));
    }else{
      autoSuggest(action.tweet, store);
    }
  }
  next(action);
}

function autoSuggest(tweet, store){
  //Checks for last occurence of substring starting with @
  let searchTerm = tweet.match(/@\w+$/g);
  searchTerm = searchTerm && searchTerm[0].substring(1);
  let shouldSearch = searchTerm && searchTerm.length > 1;

  if(shouldSearch){
    store.dispatch(fetchResults(searchTerm));
  }else{
    store.dispatch(updateResults([]));
  }
}

function autoComplete(tweet, user){
    let twitterHandle = user.screen_name;
    let handleIndex = tweet.lastIndexOf('@');
    let updatedTweet = tweet.substring(0, handleIndex) + '@' + twitterHandle + ' ';
    return updatedTweet;
}
