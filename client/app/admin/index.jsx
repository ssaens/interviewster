import React from 'react';
import { Link } from 'react-router-dom';

class Admin extends React {
  render() {
    return (
      <div className='admin'>
        <div className='header'>
          Admin
        </div>
        <div className='admin-nav'>
          <div className='admin-nav__item'>
            <Link to='/admin/roles'>Roles</Link>
          </div>
          <div className='admin-nav__item'>
            <Link to='/admin/skills'>Skills</Link>
          </div>
        </div>
        <div className='admin-view'>
          <Switch>
            <Route path='/admin/roles' />
            <Route path='/admin/skills' />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
