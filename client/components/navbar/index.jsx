import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import AuthCard from './auth';

class NavBar extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <nav id="navbar">
        <div className="header-icon bold">
          <Link to='/'>Interviewster</Link>
        </div>
        <div className="header-left">
          <div className="header-left__item">
            <Link to='/how-it-works'>How it works</Link>
          </div>
          <div className="header-left__item">
            <Link to='/billing'>Billing</Link>
          </div>
          <div className="header-left__item">
            <Link to='/blog'>Blog</Link>
          </div>
        </div>
        <div className="header-right">
          <AuthCard />
        </div>
      </nav>
    );
  }
}

export default NavBar;
