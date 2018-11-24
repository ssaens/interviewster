import React from 'react';
import classNames from 'classnames';
import './style.scss';

class SearchBar extends React.PureComponent {
  render() {
    return (
      <div className={classNames('search-bar', {'no-margin': this.props.noMargin})}>
        <input 
          className='search-bar__input'
          type='text' 
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          value={this.props.value}
        />
        <div className='search-bar__button'>
          <i className='icon ion-ios-search' />
        </div>
      </div>
    )
  }
}

export default SearchBar;
