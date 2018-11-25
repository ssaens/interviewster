import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import { LOGOUT } from 'reducer/action-types';

class AuthCard extends React.Component {
  render() {
    return (
      <div className='unauthed-card'>
        <div className='card_item'>
          <a onClick={this.props.onLogout}>Log out</a>
        </div>
        <div className='card_item'>
          <Link to='/guides'>{this.props.user.username}</Link>
        </div>
      </div>
    )
  }
}

export default AuthCard;
