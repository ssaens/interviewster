import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import './style.scss';

import Roles from './roles';
import Skills from './skills';
import NoMatch from '../no-match';

class Admin extends React.PureComponent {
  render() {
    return (
      <div className='admin'>
        <div className='admin-nav'>
          <div className='admin-header admin-nav__item bold'>
            Admin
          </div>
          <div className='admin-nav__item'>
            <NavLink activeStyle={{textDecoration: 'underline'}} to='/admin/roles'>Roles</NavLink>
          </div>
          <div className='admin-nav__item'>
            <NavLink activeStyle={{textDecoration: 'underline'}} to='/admin/skills'>Skills</NavLink>
          </div>
        </div>
        <div className='admin-view'>
          <Switch>
            <Route path='/admin/roles' component={Roles} />
            <Route path='/admin/skills' component={Skills} />
            <Route exact path='/admin' />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
