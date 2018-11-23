import React from 'react';
import './style.scss';

import { Button } from 'components/ui';
import { LOGIN, REGISTER } from 'reducer/action-types';

class UnauthedCard extends React.Component {
  render() {
    return (
      <div className='unauthed-card'>
        <div className='card_item'>
          <a onClick={() => this.props.openModal(LOGIN)}>Log in</a>
        </div>
        <div className='card_item'>
          <Button 
            label='Sign up'
            onClick={() => this.props.openModal(REGISTER)}
          />
        </div>
      </div>
    )
  }
}

export default UnauthedCard;
