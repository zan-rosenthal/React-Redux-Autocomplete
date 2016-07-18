import axios from 'axios';
import * as types from './actionTypes.js';

export function updateTweet (tweet, user){
  return {
    type:types.UPDATE_TWEET,
    tweet,
    user
  }
}

export function updateResults(results) {
  return {
    type: types.UPDATE_RESULTS,
    results
  };
}

export function setHighlight (index){
  return{
    type: types.SET_HIGHLIGHT,
    index
  }
}

export function fetchResults(searchTerm) {
  const searchUsersURL = "http://localhost:3001/twitter/user/search"
  return dispatch => {
     axios.get(searchUsersURL, { params: { username: searchTerm } })
                .then(response => {
                  dispatch(updateResults(response.data.users));
                })
                .catch(err => {
                  console.log(err);
                });
  }
}
