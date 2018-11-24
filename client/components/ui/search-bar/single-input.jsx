import React from 'react';
import classNames from 'classnames';
import './style.scss';

class SingleInput extends React.PureComponent {
  render() {
    const { selected, onClear } = this.props;
    if (selected) {
      return (
        <div className={classNames('search-bar', {'no-margin': this.props.noMargin})}>
          <div className='search-bar__input'>
            <div className='search-bar__input-tag rel'>
              {selected}
              <span className='clear' onClick={onClear}>
                <i className='icon ion-ios-close' />
              </span>
            </div>
          </div>
          <div className='search-bar__button'>
            <i className='icon ion-ios-search' />
          </div>
        </div>
      )
    }
    return (
      <div className={classNames('search-bar', {'no-margin': this.props.noMargin})}>
        <input 
          className='search-bar__input'
          type='text' 
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        <div className='search-bar__button'>
          <i className='icon ion-ios-search' />
        </div>
      </div>
    )
  }
}

export default SingleInput;
