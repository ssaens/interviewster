import React from 'react';

import { SearchBar } from 'components/ui';
import RoleBox from 'components/create-guide/role-box';

class AllRoles extends React.PureComponent {
  render() {
    const { roles, busy } = this.props;
    return (
      <div className='admin-role admin-section'>
        <div className='bold'>
          All Roles
        </div>
        <SearchBar placeholder='filter' />
        <div className='featured-list'>
          <RoleBox roles={roles} busy={busy} />
        </div>
      </div>
    );
  }
}

export default AllRoles;
