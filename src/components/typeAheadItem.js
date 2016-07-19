import React, { Component, PropTypes } from 'react';

class TypeAheadItem extends Component {

  handleMouseEnter(){
    let { setHighlight, index } = this.props;
    setHighlight(index);
  }

  handleMouseLeave(){
    this.props.setHighlight(-1);
  }

  handleClick(){
    let {  user, updateTweet } = this.props;
    updateTweet(null, user)
  }

  render(){
    //setHighlight changes currently highlighted index
    //highlightedIndex changes with keyup, keydown, and when user hovers over an item
    const { highlightedIndex, index, user, updateTweet } = this.props;
    const highlighted = highlightedIndex === index ? "highlighted" : "";

    return(
      <li className="typeahead-item centered"
        id={highlighted}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={this.handleClick.bind(this)}>
        <img className="user_info user_img" src={user.profile_image_url}/>
        <span className="user_info user_screen_name">{user.screen_name}</span>
        <span className="user_info user_name"> {user.name} </span>
      </li>
    )
  }

};

TypeAheadItem.propTypes ={
  index:PropTypes.number,
  user:PropTypes.object,
  highlightedIndex:PropTypes.number,
  updateTweet:PropTypes.func,
  setHighlight:PropTypes.func
};


export default TypeAheadItem;
