import React from 'react';
import './style.scss';

class SearchBar extends React.Component {
  render() {
    return (
      <div className='search-bar'>
        <input 
          className='search-bar__input'
          type='text' 
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        <div className='search-bar__button'>
          S
        </div>
      </div>
    )
  }
}

export default SearchBar;
