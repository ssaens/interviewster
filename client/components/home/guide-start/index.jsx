import React from 'react';
import './style.scss';

import SearchRoles from './search-roles';
import PopularRoles from './popular-roles';

class GuideStart extends React.Component {
  render() {
    return (
      <div className='guide-start'>
        <SearchRoles />
        <PopularRoles />
      </div>
    );
  }
}

export default GuideStart; 
