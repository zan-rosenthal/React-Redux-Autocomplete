import axios from 'axios';
import * as types from './actionTypes.js';

//Updates value of input in ComposeTweet components
//Passes through tweetMiddleware to check if it should
//Update typeahead results or autocomplete a twitter handle
//when a user selects from typeahead menu
export function updateTweet (tweet, user){
  return {
    type:types.UPDATE_TWEET,
    tweet,
    user
  }
}

//Updates typeahead menu results
export function updateResults(results) {
  return {
    type: types.UPDATE_RESULTS,
    results
  };
}

//Sets currently highlighted entry in typeahead menu
export function setHighlight (index){
  return{
    type: types.SET_HIGHLIGHT,
    index
  }
}

//Handles requests to server for typeahead menu results
//Passes through redux-thunk middleware
export function fetchResults(searchTerm) {
  const searchUsersURL = "http://localhost:3001/twitter/user/search"
  return dispatch => {
      return axios.get(searchUsersURL, { params: { username: searchTerm } })
                .then(response => {
                  dispatch(updateResults(response.data.users));
                })
                .catch(err=>{
                  console.log(err)
                });
  }
}
