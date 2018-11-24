import React from 'react';

import RoleBox from 'components/create-guide/role-box';

class PopularRoles extends React.PureComponent {
  render() {
    const { roles, busy, onClick } = this.props;
    return (
      <div className='popular-roles'>
        <div className='bold'>
          Popular Roles
        </div>
        <div className='popular-list'>
          <RoleBox roles={roles} busy={busy} onClick={onClick} />
        </div>
      </div>
    );
  }
}

export default PopularRoles;
